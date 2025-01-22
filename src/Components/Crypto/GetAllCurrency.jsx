import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';
import Pagination from '../Pagination';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const CoinListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  color: #FFFFFF;
  padding-left: 0;
  border-bottom: 1px solid #222B44;
  margin-bottom: 24px;
  text-align: center;
  padding-bottom: 29px;
  margin: 0 34px;
`;

const CoinItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  margin: 7px 0;
  border: 1px solid #222B44;
  border-radius: 10px;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #313E62;
  }
`;

const CoinName = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #FFFFFF;
`;

const CoinPrice = styled.div`
  font-size: 18px;
  color: #00FF00;
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

const GraphContainer = styled.div`
  margin: 20px;
  padding: 20px;
  background-color: #1a1a1a;
  border-radius: 20px;
  animation: slide 2s ease-in-out infinite;

@keyframes slide {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateY(20px);
  }
  100% {
    transform: translateX(0px); 
  }
}
`;

const CoinStats = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [coinStats, setCoinStats] = useState(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const fetchCoins = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 100,
          page: 1,
        }
      });
      setCoins(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCoinStats = async (coinId) => {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`, {
        params: {
          vs_currency: 'usd',
          days: '7',
        }
      });
      setCoinStats(response.data);
    } catch (error) {
      console.error("Error fetching coin stats:", error);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handleCoinClick = (coin) => {
    setSelectedCoin(coin);
    fetchCoinStats(coin.id);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedCoins = filteredCoins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  const Span = styled.span`
    font-size: 22px;
    font-weight: 600;
    line-height: 29px;
`;

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
          value={search}
          type="text"
          placeholder='Search'
        />
      </div>
      <CoinListContainer >
        {paginatedCoins.map((coin) => (
          <CoinItem key={coin.id} onClick={() => handleCoinClick(coin)}>
            <CoinName>{coin.name}</CoinName>
            <CoinPrice>${coin.current_price}</CoinPrice>
          </CoinItem>
        ))}
      </CoinListContainer>

      {selectedCoin && coinStats && (
        <GraphContainer>
          <h2 style={{ color: '#FFF' }}>{selectedCoin.name} Price Statistics (Last 7 Days)</h2>
          <Line
            data={{
              labels: coinStats.prices.map(item => new Date(item[0]).toLocaleDateString()),  // Ticker Date
              datasets: [{
                label: `${selectedCoin.name} Price (USD)`,
                data: coinStats.prices.map(item => item[1]),
                borderColor: 'rgb(75, 192, 192)',
                fill: false,
                tension: 0.1,
              }]
            }}
          />
        </GraphContainer>
      )}

      <Pagination
        currentPage={currentPage}
        totalItems={filteredCoins.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CoinStats;
