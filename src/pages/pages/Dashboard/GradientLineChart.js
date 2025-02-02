import React from 'react';
import { useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Box, Typography } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import CustomSwitch from '../../components/CustomSwitch';

// Register necessary components for Chart.js
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Filler, Title, Tooltip, Legend, zoomPlugin);

const GradientLineChart = ({ selectedToken }) => {
const tokenDictioanry = {
  'bitcoin': 'BTC',
  'ethereum': 'ETH',
  'cardano': 'ADA',
  'litecoin': 'LTC',
  'binancecoin': 'BNB',
  'polygon': 'MATIC',
  'solana': 'SOL',
};

  const tokenData = useSelector((state) => state.tokens.data[tokenDictioanry[selectedToken]]);
  const status = useSelector((state) => state.tokens.status);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [groupByDay, setGroupByDay] = React.useState(true);

  const groupByDayAndAverage = (data) => {
    const groupedData = {};
    data.forEach((entry) => {
      const dateKey = entry.date.toISOString().split('T')[0];
      if (!groupedData[dateKey]) {
        groupedData[dateKey] = { totalRealPrice: 0, count: 0 };
      }
      groupedData[dateKey].totalRealPrice += entry.realPrice;
      groupedData[dateKey].count += 1;
    });
    return Object.entries(groupedData).map(([date, { totalRealPrice, count }]) => ({
      date: new Date(date),
      avgRealPrice: totalRealPrice / count,
    }));
  };

  const chartData = (canvas) => {
    const ctx = canvas.getContext('2d');
    const height = window.innerWidth < 600 ? 150 : 300; // ✅ Adaptive height based on screen size
    const gradient = ctx.createLinearGradient(0, 0, 0, height); 
    gradient.addColorStop(0, 'rgba(72, 177, 85, 0.3)');
    gradient.addColorStop(1, 'rgba(72, 177, 85, 0)');

    if (!tokenData) return;

    const dataToPlot = groupByDay ? groupByDayAndAverage(tokenData) : tokenData;

    // Format dates to 'dd MMM yyyy'
    const formattedDates = dataToPlot.map((item) =>
      new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: 'short',
      }).format(item.date)
    );

    return {
      labels: formattedDates,
      datasets: [
        {
          data: dataToPlot.map((item) => item.avgRealPrice || item.realPrice),
          fill: true,
          backgroundColor: gradient,
          borderColor: 'rgba(72, 177, 85, 0.8)',
          pointRadius: 0,
          tension: 0.3,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: window.innerWidth < 600 ? { top: 5, bottom: 15 } : { top: 25, bottom: 40 }, // ✅ Prevents unnecessary spacing
    },
    scales: {
      y: {
        ticks: {
          color: 'white',
          font: { size: window.innerWidth < 600 ? 12 : 14 },
          maxTicksLimit: window.innerWidth < 600 ? 4 : 6,
          autoSkip: true,
          callback: function (value) {
            return value >= 1000 ? `${value / 1000}k` : value.toFixed(2);
          },
        },
        grid: {
          display: window.innerWidth < 600 ? false : true, // ✅ Hides grid lines
          drawBorder: false, // ✅ Removes axis border line
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      x: {
        ticks: {
          color: 'white',
          font: { size: window.innerWidth < 600 ? 12 : 14 },
          maxTicksLimit: window.innerWidth < 600 ? 3 : 6,
          autoSkip: true,
          maxRotation: 0,
          minRotation: 0,
        },
        grid: {
          display: window.innerWidth < 600 ? false : true, // ✅ Hides grid lines
          drawBorder: false, // ✅ Removes axis border line
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
    plugins: {
      legend: {
        display: false, // ✅ Hide dataset labels in legend
      },
      zoom: {
        pan: { enabled: true, mode: 'x' },
        zoom: { enabled: true, mode: 'x', drag: true },
      },
    },
  };

  const toCapitalCase = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return (
    <div style={{ height: isMdUp ? '400px' : '200px', width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <Typography variant="h6" gutterBottom>
          {toCapitalCase(selectedToken)} USD
        </Typography>
        <CustomSwitch groupByDay={groupByDay} setGroupByDay={setGroupByDay} />
      </Box>
      {status === 'loading' ? (
        <p>Loading data...</p>
      ) : tokenData ? (
        <Line data={chartData} options={options} />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default GradientLineChart;