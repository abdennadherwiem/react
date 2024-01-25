import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Paper, List, ListItem, ListItemText, Card } from '@material-ui/core';

const ColorList = () => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/colors/all');
        setColors(response.data);
      } catch (error) {
        console.error('Error fetching colors:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Card style={{ backgroundColor: 'blue', padding: '20px', maxWidth: '400px', margin: '10px', textAlign: 'center', width: '200px' }}>
      <Typography variant="h4" style={{ color: 'white' }}>Color List</Typography>
      <Paper elevation={3} style={{ backgroundColor: 'white', padding: '10px', overflowY: 'auto' }}>
        <List>
          {colors.map((color, index) => (
            <ListItem key={index} style={{ background: `rgba(173, 216, 230, ${index % 2 === 0 ? 0.5 : 0.8})`, fontWeight: 'bold', border: '1px solid blue', borderRadius: '5px', marginBottom: '5px' }}>
              <ListItemText primary={color} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Card>
  );
};

export default ColorList;

