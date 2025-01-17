import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../index.css'; 
import styled from 'styled-components';
import search from '../../assets/search-circle.png'

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

    const GetResponse = async () => {
        try {
            const res = await axios.get('https://api.coinlore.net/api/tickers/?start=100&limit=100');
            setCurrency(res.data.data);
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
                <input onChange={(e) => console.log(e.target.value)}
                    className='inputSeach'
                    type="text"
                    placeholder='Search'
                />
            </div>
            <ul>
                {currency.map((item) => (
                    <li key={item.id}>
                        <p>{item.name}</p>
                        <p>${item.price_usd}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GetAllCurrency;
