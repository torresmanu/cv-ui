import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import Plot from 'react-plotly.js';

const CandlePlotChart = ({ selectedToken }) => {
  const tokenDictionary = {
    bitcoin: 'BTC',
    ethereum: 'ETH',
    cardano: 'ADA',
    litecoin: 'LTC',
    binancecoin: 'BNB',
    polygon: 'MATIC',
    solana: 'SOL',
  };

  // Access token data and status from Redux
  const tokenData = useSelector((state) => state.tokens.data[tokenDictionary[selectedToken]]);
  const status = useSelector((state) => state.tokens.status);

  // Prepare candlestick chart data
  const prepareChartData = (data) => {
    const groupedData = data.reduce((acc, point) => {
      const dayKey = new Date(point.date).toISOString().split('T')[0];
      if (!acc[dayKey]) {
        acc[dayKey] = {
          open: point.realPrice,
          high: point.realPrice,
          low: point.realPrice,
          close: point.realPrice,
        };
      } else {
        acc[dayKey].high = Math.max(acc[dayKey].high, point.realPrice);
        acc[dayKey].low = Math.min(acc[dayKey].low, point.realPrice);
        acc[dayKey].close = point.realPrice;
      }
      return acc;
    }, {});

    return Object.entries(groupedData).map(([date, { open, high, low, close }]) => ({
      date: new Date(date),
      open,
      high,
      low,
      close,
    }));
  };

  const isMobile = window.innerWidth < 600; // ✅ Detect mobile view
  const processedData = tokenData ? prepareChartData(tokenData) : [];
  
  return (
    <Box sx={{ backgroundColor: 'transparent' }}>
      <Typography variant="h6" gutterBottom>
        Candlestick Chart ({selectedToken.charAt(0).toUpperCase() + selectedToken.slice(1)})
      </Typography>
      {status === 'loading' ? (
        <Typography>Loading data...</Typography>
      ) : status === 'failed' ? (
        <Typography variant="body2" style={{ color: 'red' }}>
          Error loading data for {selectedToken}.
        </Typography>
      ) : processedData.length > 0 ? (
        <Plot
          data={[
            {
              x: processedData.map((point) => point.date),
              open: processedData.map((point) => point.open),
              high: processedData.map((point) => point.high),
              low: processedData.map((point) => point.low),
              close: processedData.map((point) => point.close),
              type: 'candlestick',
              name: tokenDictionary[selectedToken],
              increasing: { line: { color: '#2AAE6F', width: 0.7 } },
              decreasing: { line: { color: '#FF3333', width: 0.7 } },
            },
          ]}
          layout={{
            xaxis: {
              type: 'date',
              gridcolor: 'rgba(255, 255, 255, 0.1)',
              titlefont: { color: 'white' },
              tickfont: { color: 'white', size: isMobile ? 10 : 14 }, // ✅ Smaller font on mobile
              showgrid: false,
              tickangle: isMobile ? -45 : 0, // ✅ Avoid overlap on mobile
              rangeslider: { visible: false },
            },
            yaxis: {
              gridcolor: 'rgba(255, 255, 255, 0.1)',
              tickfont: { color: 'white', size: isMobile ? 10 : 14 }, // ✅ Smaller font on mobile
              tickvals: isMobile ? undefined : undefined, // ✅ Fewer ticks on mobile
              showgrid: false, // ✅ Removes grid for cleaner look
            },
            margin: { t: 20, r: 10, l: isMobile ? 40 : 60, b: isMobile ? 50 : 70 }, // ✅ Adjust margins
            autosize: true,
            height: isMobile ? 200 : 400, // ✅ Smaller height on mobile
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
        <Typography>No data available for {selectedToken}.</Typography>
      )}
    </Box>
  );
};

export default CandlePlotChart;