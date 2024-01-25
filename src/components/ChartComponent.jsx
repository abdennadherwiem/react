import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { Card, CardContent, Typography } from '@material-ui/core';

const ChartComponent = () => {
  const chartRef = useRef(null);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    // Fetch ratings from your API
    const fetchRatings = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products/allRatings');
        setRatings(response.data);
      } catch (error) {
        console.error('Error fetching ratings:', error.message);
      }
    };

    // Fetch ratings initially
    fetchRatings();

    // Set up a WebSocket connection for real-time updates
    const socket = new WebSocket('ws://localhost:8080/socket'); // Replace with your WebSocket endpoint

    // Listen for updates from the server
    socket.addEventListener('message', (event) => {
      const updatedRatings = JSON.parse(event.data);
      setRatings(updatedRatings);
    });

    // Clean up WebSocket connection on component unmount
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    // Create a 2D context for the chart
    const ctx = chartRef.current.getContext('2d');

    // Create the chart with dynamic data
    const myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(ratings),
        datasets: [
          {
            data: Object.values(ratings),
            backgroundColor: [
              'rgba(0, 0, 255, 0.8)',
              'rgba(135, 206, 250, 0.8)',
              'rgba(70, 130, 180, 0.8)',
              'rgba(0, 191, 255, 0.8)',
              'rgba(30, 144, 255, 0.8)',
              'rgba(0, 0, 128, 0.8)',
              'rgba(0, 128, 128, 0.8)',
            ],
          },
        ],
      },
    });

    // Clean up the chart on component unmount
    return () => {
      myChart.destroy();
    };
  }, [ratings]);

  return (
    <Card style={{ width: '320px', height: '350px' }}>
      <CardContent>
        <Typography variant="h6">Modéles Distribution BMW</Typography>
        <div>
          <canvas ref={chartRef} style={{ width: '100%', height: '100%' }}></canvas>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartComponent;