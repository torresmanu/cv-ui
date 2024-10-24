import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import Plot from 'react-plotly.js';
import Papa from 'papaparse';

const CandlePlotChart = ({ selectedToken }) => {
  const [dataByToken, setDataByToken] = useState({});

  const loadCSVData = () => {
    fetch(`${process.env.PUBLIC_URL}/data.csv`)
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            const tokenMap = {};
            const cutoffDate = new Date('2024-08-15T23:59:59'); // Set the cutoff date to August 15, 2024
  
            // Iterate over rows and group them by token and day
            results.data.forEach((row) => {
              if (row.Token && row.Real_price && row.Fecha) {
                const date = new Date(row.Fecha);
  
                // Only process data up to August 15
                if (date <= cutoffDate) {
                  const dayKey = date.toISOString().split('T')[0]; // Extract only the date part (YYYY-MM-DD)
  
                  // Initialize the map for the token if not done already
                  if (!tokenMap[row.Token]) tokenMap[row.Token] = {};
                  if (!tokenMap[row.Token][dayKey]) {
                    tokenMap[row.Token][dayKey] = {
                      open: row.Real_price,
                      high: row.Real_price,
                      low: row.Real_price,
                      close: row.Real_price,
                    };
                  } else {
                    // Update the high, low, and close prices for the day
                    tokenMap[row.Token][dayKey].high = Math.max(tokenMap[row.Token][dayKey].high, row.Real_price);
                    tokenMap[row.Token][dayKey].low = Math.min(tokenMap[row.Token][dayKey].low, row.Real_price);
                    tokenMap[row.Token][dayKey].close = row.Real_price;  // Last price will be the close price
                  }
                }
              }
            });
  
            // Now flatten the grouped data into an array
            const flattenedTokenMap = {};
            Object.keys(tokenMap).forEach((token) => {
              flattenedTokenMap[token] = Object.keys(tokenMap[token]).map((dayKey) => ({
                date: new Date(dayKey),
                open: tokenMap[token][dayKey].open,
                high: tokenMap[token][dayKey].high,
                low: tokenMap[token][dayKey].low,
                close: tokenMap[token][dayKey].close,
              }));
            });
  
            setDataByToken(flattenedTokenMap);
          },
        });
      });
  };

  useEffect(() => {
    loadCSVData();
  }, []);

  return (
    <Box sx={{ backgroundColor: 'transparent' }}>
      <Typography variant="h6" gutterBottom>
        Candlestick Chart (Token: {selectedToken})
      </Typography>
      {selectedToken && dataByToken[selectedToken] && dataByToken[selectedToken].length > 0 ? (
        <Plot
          data={[
            {
              x: dataByToken[selectedToken].map((point) => point.date),
              open: dataByToken[selectedToken].map((point) => point.open),
              high: dataByToken[selectedToken].map((point) => point.high),
              low: dataByToken[selectedToken].map((point) => point.low),
              close: dataByToken[selectedToken].map((point) => point.close),
              type: 'candlestick',
              name: selectedToken,
              increasing: { line: { color: '#4BFF33'} },
              decreasing: { line: { color: '#FF3333' } },
            },
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
      )}
    </Box>
  );
};

export default CandlePlotChart;