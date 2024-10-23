import React, { useState, useEffect } from 'react';
import { Box, Typography, Switch, FormControlLabel } from '@material-ui/core';
import Plot from 'react-plotly.js';
import Papa from 'papaparse';
import CustomSwitch from '../../components/CustomSwitch';

const LinePlotChart = ({ selectedToken }) => {
  const [dataByToken, setDataByToken] = useState({});
  const [groupByDay, setGroupByDay] = useState(true); // State to toggle between group by day and hourly

  const loadCSVData = () => {
    fetch('/predicciones.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            const tokenMap = {};
            results.data.forEach(row => {
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
          }
        });
      });
  };

  // Function to group data by day and calculate average price and prediction
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

  return (
    <Box sx={{ backgroundColor: 'transparent' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" gutterBottom>
          Real Price vs CryptoVoice Prediction (Token: {selectedToken})
        </Typography>

        {/* Toggle switch to change between "Group by Day" and "Hourly" views */}
        <CustomSwitch groupByDay={groupByDay} setGroupByDay={setGroupByDay} />
      </Box>
      {/* Plot for the selected token */}
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
              line: { color: '#035ECE', width: 1 },
              name: groupByDay ? 'Average Real Price' : 'Real Price',
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
              line: { color: '#ff7f0e', width: 2 },
              name: groupByDay ? 'Average Prediction' : 'Prediction',
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
              showgrid: false, // Hides the vertical grid lines
            },
            yaxis: { 
              title: {
                text: 'Price',
                font: {
                  color: 'white',
                },
                standoff: 20,  // This adds padding between the title and the axis
              },
              gridcolor: 'rgba(255, 255, 255, 0.1)',
              tickfont: {
                color: 'white',
              },
              tickcolor: 'rgba(255, 255, 255, 0)',  // Set the tick color
              ticklen: 10,   // Length of the ticks (controls the spacing between grid and tick labels)
              tickwidth: 0.1,  // Optional: Set tick line width for better visibility
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
              font: { 
                color: 'white'
              }
            },
            paper_bgcolor: 'rgba(255, 255, 255, 0)',
            plot_bgcolor: 'rgba(255, 255, 255, 0)',
          }}
          useResizeHandler
          style={{ width: '100%' }}
          config={{ 
            modeBarButtonsToRemove: [
              'resetScale2d', 'zoom2d', 'pan2d', 'select2d', 'lasso2d'
            ], // Hide specific buttons if needed
            displaylogo: false, // Hide Plotly logo in the mode bar
            modeBarStyle: {
              backgroundColor: 'transparent', // Make the background transparent
            },
          }}     
        />
      ) : (
        <Typography>No data available for the selected token.</Typography>
      )}
    </Box>
  );
};

export default LinePlotChart;