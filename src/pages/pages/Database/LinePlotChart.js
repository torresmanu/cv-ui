import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import Plot from 'react-plotly.js';
import Papa from 'papaparse';

const LinePlotChart = ({ selectedToken }) => {
  const [dataByToken, setDataByToken] = useState({});
  const [availableTokens, setAvailableTokens] = useState([]);

  // Function to fetch and parse the CSV file
  const loadCSVData = () => {
    fetch('/predicciones.csv') // Update with your actual CSV file path
      .then(response => response.text()) // Get the raw CSV text
      .then(csvText => {
        Papa.parse(csvText, {
          header: true, // Use the first row as the header
          dynamicTyping: true, // Automatically convert types (e.g., numbers)
          complete: (results) => {
            // Group the data by Token
            const tokenMap = {};
            results.data.forEach(row => {
              if (row.Token && row.Real_price && row.Prediction_Ensemble) {
                if (!tokenMap[row.Token]) {
                  tokenMap[row.Token] = [];
                }
                tokenMap[row.Token].push({
                  date: new Date(row.Fecha),
                  realPrice: row.Real_price,
                  predictionEnsemble: row.Prediction_Ensemble,
                });
              }
            });
            
            // Set the grouped data by Token
            setDataByToken(tokenMap);
            const tokens = Object.keys(tokenMap);
            setAvailableTokens(tokens);
          }
        });
      });
  };

  // Fetch CSV data on component mount
  useEffect(() => {
    loadCSVData();
  }, []);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Real Price vs CryptoVoice Prediction (Token: {selectedToken})
      </Typography>

      {/* Plot for the selected token */}
      {selectedToken && dataByToken[selectedToken] && dataByToken[selectedToken].length > 0 ? (
        <Plot
          data={[
            {
              x: dataByToken[selectedToken].map((point) => point.date), // X-axis is the date
              y: dataByToken[selectedToken].map((point) => point.realPrice),
              mode: 'lines',
              type: 'scatter',
              line: { color: '#1f77b4', width: 1 },
              name: 'Real Price',
            },
            {
              x: dataByToken[selectedToken].map((point) => point.date),
              y: dataByToken[selectedToken].map((point) => point.predictionEnsemble),
              mode: 'lines',
              type: 'scatter',
              line: { color: '#ff7f0e', width: 2 },
              name: 'Prediction',
            }
          ]}
          layout={{
            xaxis: { 
              title: 'Date',
              type: 'date', // Set the x-axis type to 'date'
            },
            yaxis: { title: 'Price' },
            margin: { t: 20, r: 20, l: 50, b: 70 },
            autosize: true,
            height: 500,
            legend: {
              orientation: 'h',
              x: 0.5,
              xanchor: 'center',
              y: -0.2,
              yanchor: 'top',
              font: { 
                color: 'black' // Set the legend font color to black
              }
            },
            paper_bgcolor: 'rgba(255, 255, 255, 0)', // Transparent paper background
            plot_bgcolor: 'rgba(255, 255, 255, 0)', // Semi-transparent plot background
          }}
          useResizeHandler
          style={{ width: '100%' }}
          config={{ 
            displayModeBar: true,
            modeBarButtonsToRemove: ['pan', 'zoomOut'], // Optional: Remove specific buttons if needed
            displaylogo: false, // Optional: Hide Plotly logo
          }}        />
      ) : (
        <Typography>No data available for the selected token.</Typography>
      )}
    </Box>
  );
};

export default LinePlotChart;