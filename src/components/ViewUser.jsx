import React, { useState, useEffect } from 'react';
import { Paper, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
  },
}));

const ViewUser = () => {
  const classes = useStyles();
  const { id } = useParams(); // Get user ID from the URL
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: '',
    password: '',
    // Ajoutez d'autres champs d'utilisateur selon votre modèle de données
  });

  useEffect(() => {
    // Fetch user data for the given ID
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/${id}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUserData();
  }, [id]);

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Typography component="h1" variant="h5">
          User Details
        </Typography>
        <div>
          <Typography variant="h6">Username:</Typography>
          <Typography variant="body1">{userData.username}</Typography>
        </div>
        <div>
          <Typography variant="h6">Password:</Typography>
          <Typography variant="body1">{userData.password}</Typography>
        </div>
        {/* Ajoutez d'autres champs d'utilisateur selon votre modèle de données */}
      </Paper>
    </Container>
  );
};

export default ViewUser;

















