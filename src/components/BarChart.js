import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { Card, CardContent, Typography } from '@material-ui/core';

const BarChart = () => {
  const chartRef = useRef(null);
  const [ratings, setRatings] = useState({});
  const [maxRatingTitle, setMaxRatingTitle] = useState('');
  const [minRatingTitle, setMinRatingTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products/allRatings');
        setRatings(response.data);
      } catch (error) {
        console.error('Error fetching ratings:', error.message);
      }
    };

    fetchData();

    const socket = new WebSocket('ws://localhost:8080/socket');

    socket.addEventListener('message', (event) => {
      const updatedRatings = JSON.parse(event.data);
      setRatings(updatedRatings);
    });

    const handleResize = () => {
      if (chartRef.current && chartRef.current.chart) {
        const chartInstance = chartRef.current.chart;
        chartInstance.resize();
      }
    };

window.addEventListener('resize', handleResize);

    return () => {
      socket.close();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchTitleWithMaxRating = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products/titleWithMaxRating');
        setMaxRatingTitle(response.data);
      } catch (error) {
        console.error('Error fetching title with max rating:', error.message);
      }
    };

    const fetchTitleWithMinRating = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products/titleWithMinRating');
        setMinRatingTitle(response.data);
      } catch (error) {
        console.error('Error fetching title with min rating:', error.message);
      }
    };

    fetchTitleWithMaxRating();
    fetchTitleWithMinRating();
  }, []);

  useEffect(() => {
    if (Object.keys(ratings).length === 0 || !maxRatingTitle || !minRatingTitle) {
      return; // Ne rien faire si les données ne sont pas encore chargées
    }

    const ctx = chartRef.current.getContext('2d');

    const myChart = new Chart(ctx, {
      type: 'bar',
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
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 10,
              max: 100,
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              generateLabels: function (chart) {
                return [
                  { text: `Max Rating: ${maxRatingTitle}`, fillStyle: 'rgba(0, 0, 255, 0.8)' },
                  { text: `Min Rating: ${minRatingTitle}`, fillStyle: 'rgba(0, 128, 128, 0.8)' },
                ];
              },
            },
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [ratings, maxRatingTitle, minRatingTitle]);

  return (
    <Card style={{ width: '400px', height: '350px' }}>
      <CardContent>
        <Typography variant="h6">Comparison Quantity Between Cars</Typography>
        <canvas ref={chartRef} width={400} height={300}></canvas>
      </CardContent>
    </Card>
  );
};

export default BarChart;












