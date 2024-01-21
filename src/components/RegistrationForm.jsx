import React, { useState } from 'react';
import { Button, TextField, Typography, Paper, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const RegistrationForm = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to register the user
      const response = await axios.post('http://localhost:8080/user/register', formData);

      // Assuming your API returns a token upon successful registration
      const token = response.data;

      // Save the token in local storage or a state management solution
      // For simplicity, let's store it in local storage
      localStorage.setItem('authToken', token);

      // Redirect to the home page after successful registration
      navigate('/LoginForm');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} onSubmit={handleRegister}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>


          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
             <NavLink to={'/LoginForm'} style={{color:'white'}}>Go To Login</NavLink>
          </Button>
        </form>
        {/*<NavLink to={'/LoginForm'}>Go To Login</NavLink>*/}
      </Paper>
    </Container>
  );
};

export default RegistrationForm;
