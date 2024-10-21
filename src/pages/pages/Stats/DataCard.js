import React from 'react';

import { Card as MuiCard, Typography, Box, Tooltip } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { Bar } from "react-chartjs-2";
import 'chart.js'; 

// Reusable DataCard component
export function DataCard({ title, data, isLoading, color, subdata }) {
  return (
    <MuiCard style={{ borderRadius: '8px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <Box p={3}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {subdata &&
          <Typography variant="caption">
            {subdata}
          </Typography>
        }
        <Typography variant="h4" style={{ color: color, textAlign: 'center' }}>
          {!isLoading ? data || "-" : <Skeleton animation="wave" />}
        </Typography>
      </Box>
    </MuiCard>
  );
}

// Reusable TitleCard component
export function TitleCard({ title, tooltip }) {
  return (
    <MuiCard style={{ borderRadius: '8px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <Box p={3} display="flex" justifyContent={"center"} alignItems="center" height="100%">
        <Tooltip title={tooltip || ''} arrow placement="top">
          <Typography variant={"h4"} gutterBottom={false}>
            {title}
          </Typography>
          </Tooltip>
      </Box>
    </MuiCard>
  );
}

// BarChartCard component to display a bar chart
export function BarChartCard({ title, data, isLoading }) {
  const chartData = {
    labels: data?.map(item => item?.name),
    datasets: [
      {
        label: title === 'Discarded' ? 'Discarded Tasks' : 'Failures',
        data: data?.map(item => item?.count),
        backgroundColor: title === 'Discarded' ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 99, 132, 0.2)',
        borderColor: title === 'Discarded' ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    legend: {
      display: false
    },
    plugins: {
      title: {
        display: true,
        text: title
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: title === 'Discarded' ? 5 : 1,
          callback: function(value) { return Number.isInteger(value) ? value : null; }
        }
      }]
    }
  };

  return (
    <MuiCard style={{ borderRadius: '8px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <Box p={3}>
        {isLoading ? (
          <Skeleton animation="wave" height={200} />
        ) : (
          <Bar data={chartData} options={options} />
        )}
      </Box>
    </MuiCard>
  );
}