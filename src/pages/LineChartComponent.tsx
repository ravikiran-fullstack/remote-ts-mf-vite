import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface Roi {
  times: number;
  currency: string;
  percentage: number;
}

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: Roi | null;
  last_updated: string;
}

const useFetchCryptoData = () => {
  const [data, setData] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "http://localhost:9001/coinsInfo"
      );
      setData(response.data);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
};

const LineChartComponent: React.FC = () => {
  const { data, loading, error } = useFetchCryptoData();
  return (
    <>
      <div>
        <h1>Top 10 Cryptocurrencies</h1>
      </div>
      <div>
        {loading ? (
          <div>Loading crypto data, please wait...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <LineChart
            width={800}
            height={400}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis dataKey="price_change_percentage_24h" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="current_price"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        )}
      </div>
    </>
  );
};

export default LineChartComponent;
