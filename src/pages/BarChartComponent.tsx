import React, { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
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

interface PayloadProps {
  value: number;
  payload: CoinData;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: PayloadProps[];
  label?: string;
}

const useGetBarChartData = () => {
  const [data, setData] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
    // console.log("API URL: ", apiUrl);
    if (!apiUrl) {
      setError("API URL is not defined");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setData(data);
    } catch (error) {
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

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`Name: ${payload[0].payload.name}`}</p>
        <p className="intro">{`Value: $${payload[0].value}`}</p>
        <p className="desc">Anything you want can be displayed here.</p>
      </div>
    );
  }
  return null;
};

const BarChartComponent: React.FC = () => {
  const { data, loading, error } = useGetBarChartData();
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
          <>
            <BarChart
              width={600}
              height={300}
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="current_price" fill="#FF0000" />
            </BarChart>

            {/* <ResponsiveContainer width="100%" height={400}>
              <BarChart {...args}>
                <Bar dataKey="uv" />
              </BarChart>
            </ResponsiveContainer> */}
          </>
        )}
      </div>
    </>
  );
};

export default BarChartComponent;
