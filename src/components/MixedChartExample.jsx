import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { Card, CardContent, Typography } from '@material-ui/core';

const MixedChartExample = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Bar Dataset',
        type: 'bar',
        data: [10, 15, 5, 2, 20, 30, 45],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Line Dataset',
        type: 'line',
        data: [5, 10, 3, 15, 25, 32, 40],
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    // Create a 2D context for the chart
    const ctx = chartRef.current.getContext('2d');

    // Create the mixed chart
    const mixedChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Clean up the chart on component unmount
    return () => {
      mixedChart.destroy();
    };
  }, [data]);

  return (
    <Card style={{ width: '600px' }}>
      <CardContent>
        <Typography variant="h5">Mixed Chart Example</Typography>
        <div>
          <canvas
            ref={chartRef}
            style={{ width: '100%', height: '200px' }}
          ></canvas>
        </div>
      </CardContent>
    </Card>
  );
};

export default MixedChartExample;
