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
      {/*<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" gutterBottom>
          Real Price vs CryptoVoice Prediction (Token: {selectedToken})
        </Typography>

        <CustomSwitch groupByDay={groupByDay} setGroupByDay={setGroupByDay} />
      </Box>
      {selectedToken && dataByToken[selectedToken] && dataByToken[selectedToken].length > 0 ? (
      <Plot
        data={[
          {
            x: groupByDay
              ? groupByDayAndAverage(dataByToken[selectedToken]).map((point) => point.date)
              : dataByToken[selectedToken].map((point) => point.date),
            y: groupByDay
              ? groupByDayAndAverage(dataByToken[selectedToken]).map((point) => point.avgRealPrice)
              : dataByToken[selectedToken].map((point) => point.realPrice),
            mode: 'lines',
            type: 'scatter',
            line: groupByDay ? { color: 'white', width: 1, dash: 'dash' } : {color: 'white', width: 1},  // Real Price line in dashed style
            name: groupByDay ? 'Day Average Price' : 'Real Price',
            hoverlabel: {
              font: {
                color: 'white', // Font color for both parts
              },
              bgcolor: '#333', // Background for the name part (label)
              bordercolor: 'rgba(255,255,255,0.2)', // Optional border color
            },
            hovertemplate: groupByDay ? 
              '<b>%{x|%b %d, %Y}</b><br><span style="color:white">$%{y}</span><extra></extra>'
              :
              '<b>%{x}</b><br><span style="color:white">$%{y}</span><extra></extra>',
          },
          {
            x: groupByDay
              ? groupByDayAndAverage(dataByToken[selectedToken]).map((point) => point.date)
              : dataByToken[selectedToken].map((point) => point.date),
            y: groupByDay
              ? groupByDayAndAverage(dataByToken[selectedToken]).map((point) => point.avgPredictionEnsemble)
              : dataByToken[selectedToken].map((point) => point.predictionEnsemble),
            mode: 'lines',
            type: 'scatter',
            line: { color: tokenColors[selectedToken], width: 2 },  // Prediction line
            name: groupByDay ? 'Day Average Prediction' : 'Prediction',
            hoverlabel: {
              font: {
                color: tokenColors[selectedToken], // Font color for both parts
              },
              bgcolor: '#333', // Background for the name part (label)
              bordercolor: 'rgba(255,255,255,0.2)', // Optional border color
            },
            hovertemplate: groupByDay ? 
              '<b>%{x|%b %d, %Y}</b><br><span style="color:white">$%{y}</span><extra></extra>'
              :
              '<b>%{x}</b><br><span style="color:white">$%{y}</span><extra></extra>',
          }
        ]}
        layout={{
          xaxis: {
            title: 'Date',
            type: 'date',
            gridcolor: 'rgba(255, 255, 255, 0.1)',
            titlefont: {
              color: 'white',
            },
            tickfont: {
              color: 'white',
            },
            showgrid: false,
          },
          yaxis: {
            title: {
              text: 'Price (USD)',
              font: {
                color: 'white',
              },
              standoff: 20,
            },
            gridcolor: 'rgba(255, 255, 255, 0.1)',
            tickfont: {
              color: 'white',
            },
            tickcolor: 'rgba(255, 255, 255, 0)',
            ticklen: 10,
            tickwidth: 0.1,
          },
          margin: { t: 30, r: 20, l: 60, b: 70 },
          autosize: true,
          height: 500,
          legend: {
            orientation: 'h',
            x: 0.5,
            xanchor: 'center',
            y: -0.2,
            yanchor: 'top',
            font: { color: 'white' },
          },
          paper_bgcolor: 'rgba(255, 255, 255, 0)',
          plot_bgcolor: 'rgba(255, 255, 255, 0)',
        }}
        useResizeHandler
        style={{ width: '100%' }}
        config={{
          modeBarButtonsToRemove: ['resetScale2d', 'zoom2d', 'pan2d', 'select2d', 'lasso2d'],
          displaylogo: false,
        }}
      />
      ) : (
        <Typography>No data available for the selected token.</Typography>
      )}*/}
    </Box>
  );
};

export default LinePlotChart;