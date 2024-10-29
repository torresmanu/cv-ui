import React, { useState, useEffect } from 'react';
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
    Interaction,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';  
import Papa from 'papaparse';
import CustomSwitch from '../../components/CustomSwitch';
import { Box, Typography } from '@material-ui/core';
import { AspectRatio } from '@material-ui/icons';

// Register necessary components for Chart.js
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Filler, Title, Tooltip, Legend, zoomPlugin);

const tokenColors = {
  BTC: '#F7931A',
  ETH: '#627EEA',
  ADA: '#0033AD',
  LINK: '#2A5ADA',
  LTC: '#345D9D',
  BNB: '#F3BA2F',
  MATIC: '#8247E5',
  SOL: '#00FFA3',
};

const GradientLineChart = ({ selectedToken }) => {
  const [dataByToken, setDataByToken] = useState({});
  const [groupByDay, setGroupByDay] = useState(true);

  const loadCSVData = () => {
    fetch(`${process.env.PUBLIC_URL}/data.csv`)
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            const tokenMap = {};
            results.data.forEach((row) => {
              if (row.Token && row.Real_price && row.Prediction_Ensemble) {
                const date = new Date(row.Fecha);
                if (!tokenMap[row.Token]) tokenMap[row.Token] = [];
                tokenMap[row.Token].push({
                  date,
                  realPrice: row.Real_price,
                  predictionEnsemble: row.Prediction_Ensemble,
                });
              }
            });
            setDataByToken(tokenMap);
          },
        });
      });
  };

  const groupByDayAndAverage = (data) => {
    const groupedData = {};
    data.forEach((entry) => {
      const dateKey = entry.date.toISOString().split('T')[0];
      if (!groupedData[dateKey]) {
        groupedData[dateKey] = { totalRealPrice: 0, totalPrediction: 0, count: 0 };
      }
      groupedData[dateKey].totalRealPrice += entry.realPrice;
      groupedData[dateKey].totalPrediction += entry.predictionEnsemble;
      groupedData[dateKey].count += 1;
    });
    return Object.entries(groupedData).map(([date, { totalRealPrice, totalPrediction, count }]) => ({
      date: new Date(date),
      avgRealPrice: totalRealPrice / count,
      avgPredictionEnsemble: totalPrediction / count,
    }));
  };

  useEffect(() => {
    loadCSVData();
  }, []);

  const chartData = (canvas) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(72, 177, 85, 0.3)'); // Reduced opacity from 0.6 to 0.3
    gradient.addColorStop(1, 'rgba(72, 177, 85, 0)');

    if (!selectedToken || !dataByToken[selectedToken]) return;

    const dataToPlot = groupByDay ? groupByDayAndAverage(dataByToken[selectedToken]) : dataByToken[selectedToken];

    return {
      labels: dataToPlot.map(item => item.date),
      datasets: [
        {
          label: 'Real Price',
          data: dataToPlot.map(item => groupByDay ? item.avgRealPrice : item.realPrice),
          fill: true,
          backgroundColor: gradient,
          borderColor: 'rgba(72, 177, 85, 0.8)', // Also made the line slightly more transparent
          pointRadius: 0,
          tension: 0.3
        },
        {
          label: 'Prediction Price',
          data: dataToPlot.map(item => groupByDay ? item.avgPredictionEnsemble : item.predictionEnsemble),
          fill: false,
          borderColor: tokenColors[selectedToken],
          pointRadius: 0,
          tension: 0.3
        }
      ]
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    AspectRatio: 3,
    scales: {
      y: {
        ticks: {
            color: 'white',
            callback: function(value) {
              if (value >= 1000) {
                return (value / 1000) + 'k';
              }
              else if (value <= 1){
                return value.toFixed(2);
              }
              // Now formatting all numbers to 2 decimal places
              return value;
            },
            font: { size: 14 },
            padding: 20,
        },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        title: {
          display: true,
          text: 'Price (USD)',
          font: { size: 16 },
          color: 'white',
        },
      },
      x: {
        ticks: {
          color: 'white',
          font: { size: 14 },
          maxTicksLimit: 6,
          callback: function(value, index, values) {
            const date = new Date(this.getLabelForValue(value));
            return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;
          },
          padding: 20,
          maxRotation: 0,
          minRotation: 0,
        },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        title: {
          display: false,
          text: 'Date',
          font: { size: 16 },
          color: 'white',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        align: 'center',
        labels: {
          boxWidth: 20,
          padding: 10,
          color: 'white',
        },
        marginLeft: {
          left: 150
        },
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          enabled: true,
          mode: 'x',
          drag: true,
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <Typography variant="h6" gutterBottom>
          Real Price vs Prediction Price (Token: {selectedToken})
        </Typography>
        <CustomSwitch groupByDay={groupByDay} setGroupByDay={setGroupByDay} />
      </Box>
      {selectedToken && dataByToken[selectedToken] ? (
        <>
          <Line data={chartData} options={options} />
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  backgroundColor: 'rgba(72, 177, 85, 0.8)',
                  borderRadius: '50%',
                  marginRight: 5
                }}
              />
              <Typography style={{ color: 'white', marginRight: 10 }}>Real Price</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  backgroundColor: tokenColors[selectedToken],
                  borderRadius: '50%',
                  marginRight: 1,
                  marginRight: 10
                }}
              />
              <Typography style={{ color: 'white' }}>Prediction Price</Typography>
            </Box>
          </Box>
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default GradientLineChart;