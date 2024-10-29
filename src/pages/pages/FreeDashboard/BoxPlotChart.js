// BoxPlotChart.js

import React from 'react';
import Plot from 'react-plotly.js';
import { Box, Typography } from '@material-ui/core';

const BoxPlotChart = ({ data, title }) => {
  if (!data) {
    return <Typography>No data available for box plot.</Typography>;
  }

  // If you have the raw data points, you can use them directly
  // const dataPoints = data.values;

  // If you're using summary statistics, you can construct the box plot accordingly
  const { min, q1, median, q3, max } = data;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Plot
        data={[
          {
            y: [min, q1, median, q3, max],
            type: 'box',
            boxpoints: false,
            marker: { color: '#8884d8' },
            name: '', // Remove default 'trace 0' label
            hoverinfo: 'y', // Show only y-values on hover
          },
        ]}
        layout={{
          autosize: true,
          height: 200,
          showlegend: false,
          margin: { t: 20, r: 30, l: 40, b: 50 },
        }}
        useResizeHandler
        style={{ width: '100%' }}
        config={{ displayModeBar: false }}
      />
    </Box>
  );
};

export default BoxPlotChart;