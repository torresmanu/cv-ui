// MedicationTreemapChart.js

import React from 'react';
import Plot from 'react-plotly.js';
import { Box, Typography } from '@material-ui/core';

const MedicationTreemapChart = ({ data, title }) => {
  if (!data || data.labels.length === 0) {
    return <Typography>No medication data available.</Typography>;
  }

  const { labels, parents, values } = data;

  // Define category colors using ColorBrewer Set2 palette
  const categoryColors = {
    'MS DMTs': '#66c2a5',         // Teal
    'Antidepressants': '#fc8d62', // Orange
    'Anticonvulsants': '#8da0cb', // Lavender
    'Cardiovascular Medications': '#e78ac3', // Pink
    'Urinary Antispasmodics': '#a6d854', // Green
    'Thyroid Hormone Replacement': '#ffd92f', // Yellow
    'Alpha Blockers': '#e5c494',   // Beige
    'Other Medications': '#b3b3b3', // Grey
  };

  // Function to adjust color brightness
  const adjustColorBrightness = (color, percent) => {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    let R = (num >> 16) + amt;
    let G = ((num >> 8) & 0x00ff) + amt;
    let B = (num & 0x0000ff) + amt;

    R = Math.max(Math.min(255, R), 0);
    G = Math.max(Math.min(255, G), 0);
    B = Math.max(Math.min(255, B), 0);

    return `#${(R << 16 | G << 8 | B).toString(16).padStart(6, '0')}`;
  };

  // Generate colors for each label
  const colors = labels.map((label, index) => {
    const parent = parents[index];
    if (label === 'Medications') {
      // Root node color
      return '#ffffff';
    } else if (categoryColors[label]) {
      // Assign color to category
      return categoryColors[label];
    } else if (categoryColors[parent]) {
      // Assign a lighter shade to medications
      return adjustColorBrightness(categoryColors[parent], 30);
    } else {
      // Default color
      return '#cccccc';
    }
  });

  // Function to get text color based on background brightness
  const getTextColor = (bgColor) => {
    const color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor;
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125 ? '#000000' : '#ffffff';
  };

  const textColors = colors.map(getTextColor);



  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Plot
        data={[
          {
            type: 'treemap',
            labels: labels,
            parents: parents,
            values: values,
            textinfo: 'label+value+percent parent',
            textfont: {
              color: textColors,
              size: 12,
            },
            hovertemplate:
              '<b>%{label}</b><br>Count: %{value}<br>Percentage: %{percentParent:.2%}<extra></extra>',
            marker: {
              colors: colors,
              line: {
                width: 1,
                color: 'white', // Adjust border color as needed
              },
            },
            pathbar: {
              visible: false, // No categories, so pathbar is unnecessary
            },
          },
        ]}
        layout={{
          margin: { t: 0, r: 0, l: 0, b: 0 },
          autosize: true,
          height: 300,
          font: {
            family: 'Roboto, sans-serif',
            size: 14,
            color: '#333',
          },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          uniformtext: {
            minsize: 10,
            mode: 'hide',
          },
        }}
        useResizeHandler
        style={{ width: '100%' }}
        config={{ displayModeBar: false }}
      />
    </Box>
  );
};

export default MedicationTreemapChart;