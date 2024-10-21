import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, IconButton } from '@material-ui/core';
import Plot from 'react-plotly.js';
import Papa from 'papaparse';
import btcImage from '../../../images/btc.png';
import ethImage from '../../../images/eth.png';
import adaImage from '../../../images/ada.png';
import linkImage from '../../../images/link.png';
import ltcImage from '../../../images/ltc.png';
import bnbImage from '../../../images/bnb.png';
import maticImage from '../../../images/matic.png';
import solImage from '../../../images/sol.png';

// Sample token images (you would replace these with actual images or import them)
const tokenImages = {
  BTC: btcImage, 
  ETH: ethImage,
  ADA: adaImage,
  LINK: linkImage,
  LTC: ltcImage,
  BNB: bnbImage,
  MATIC: maticImage,
  SOL: solImage,
};

const LinePlotChart = () => {
  const [dataByToken, setDataByToken] = useState({});
  const [selectedToken, setSelectedToken] = useState('');
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

            // Set the first token as default selected token
            if (tokens.length > 0) {
              setSelectedToken(tokens[0]);
            }
          }
        });
      });
  };

  // Fetch CSV data on component mount
  useEffect(() => {
    loadCSVData();
  }, []);

  // Handle Token Selection via icon click
  const handleTokenChange = (token) => {
    setSelectedToken(token);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Real Price vs Prediction Ensemble Over Time (Token: {selectedToken})
      </Typography>

      {/* Token Selection as icons */}
      {availableTokens.length > 0 && (
        <Grid container spacing={2} style={{ marginBottom: '20px' }}>
          {availableTokens.map((token) => (
            <Grid item key={token}>
              <IconButton onClick={() => handleTokenChange(token)}>
                <img
                  src={tokenImages[token]} // Use the token image for each button
                  alt={token}
                  style={{
                    width: 40,  // Adjust size as needed
                    height: 40, // Adjust size as needed
                    border: selectedToken === token ? '2px solid #1976d2' : 'none', // Highlight selected token
                    borderRadius: '50%', // Make it circular
                  }}
                />
              </IconButton>
              <Typography variant="caption">{token}</Typography> {/* Label below each icon */}
            </Grid>
          ))}
        </Grid>
      )}

      {/* Plot for the selected token */}
      {selectedToken && dataByToken[selectedToken] && dataByToken[selectedToken].length > 0 ? (
        <Plot
          data={[
            {
              x: dataByToken[selectedToken].map((point) => point.date), // X-axis is the date
              y: dataByToken[selectedToken].map((point) => point.realPrice),
              mode: 'lines',
              type: 'scatter',
              line: { color: '#1f77b4', width: 2 },
              name: 'Real Price',
            },
            {
              x: dataByToken[selectedToken].map((point) => point.date),
              y: dataByToken[selectedToken].map((point) => point.predictionEnsemble),
              mode: 'lines',
              type: 'scatter',
              line: { color: '#ff7f0e', width: 2 },
              name: 'Prediction Ensemble',
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
            },
          }}
          useResizeHandler
          style={{ width: '100%' }}
          config={{ displayModeBar: true }}
        />
      ) : (
        <Typography>No data available for the selected token.</Typography>
      )}
    </Box>
  );
};

export default LinePlotChart;