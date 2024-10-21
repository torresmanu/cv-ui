// HistogramChart.js

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const HistogramChart = ({ data, title }) => (
  <div>
    <h3>{title}</h3>
    <BarChart width={500} height={300} data={data}>
      <XAxis dataKey="bin" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  </div>
);

export default HistogramChart;