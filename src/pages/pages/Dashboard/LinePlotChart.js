import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import Plot from 'react-plotly.js';
import Papa from 'papaparse';
import CustomSwitch from '../../components/CustomSwitch';
import GradientLineChart from './GradientLineChart';

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

const LinePlotChart = ({ selectedToken }) => {
 {/* const [dataByToken, setDataByToken] = useState({});
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
  }, []);*/}

  return (
    <Box sx={{ backgroundColor: 'transparent' }}>
      <GradientLineChart selectedToken={selectedToken}/>
    </Box>
  );
};

export default LinePlotChart;