import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

const StatisticsCard = ({ title, value, color, icon }) => {
  return (
    <Card style={{ backgroundColor: color, color: 'white', textAlign: 'center', width: '250px',height:'150px', margin: '30px' }}>
      <CardContent>
        {icon && <img src={icon} alt={title} style={{ width: '50px', height: '50px' }} />}
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
        
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;



