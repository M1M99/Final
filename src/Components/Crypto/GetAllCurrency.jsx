import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../index.css';
import styled from 'styled-components';
import Pagination from '../Pagination';

const Span = styled.span`
    font-size: 22px;
    font-weight: 600;
    line-height: 29px;
`;

const LoadingMessage = styled.div`
    text-align: center;
    font-size: 24px;
    color: #fff;
    padding: 20px;
    font-weight: bold;
    background-color: rgba(0, 0, 0, 0.5); 
    border-radius: 8px;
`;

function GetAllCurrency() {
    const [currency, setCurrency] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 12;

    const GetResponse = async () => {
        try {
            const res = await axios.get('https://api.coinlore.net/api/tickers/?start=100&limit=100');
            setCurrency(res.data.data); 
            setTotalPages(Math.ceil(res.data.data.length / itemsPerPage)); // Sayfa sayısını güncelle
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetResponse();

        const interval = setInterval(() => {
            GetResponse();
        }, 50000);

        return () => clearInterval(interval);
    }, []);

    const filteredCurrency = currency.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    const paginatedCurrency = filteredCurrency.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    if (loading) {
        return <LoadingMessage>Loading...</LoadingMessage>;
    }

    return (
        <div className='containerElements'>
            <div className='spanMy'>
                <Span className='mySpanFor'>My organization</Span>
            </div>
            <span className='spanUsers'>Users</span>
            <div className='inputDiv'>
                <input 
                    onChange={(ev) => setSearch(ev.target.value)}
                    className='inputSeach'
                    type="text"
                    placeholder='Search'
                />
            </div>
            <div>
                <ul>
                    {paginatedCurrency.map((item) => (
                        <li key={item.id}>
                            <p>{item.name}</p>
                            <p>${item.price_usd}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
        
    );
}

export default GetAllCurrency;
