import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Typography,
  Paper,
  Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const AddTitleForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [titleName, setTitleName] = useState('');

  const handleInputChange = (e) => {
    setTitleName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envoi de la requête au backend
      await axios.post('http://localhost:8080/titles/add', { name: titleName }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Réinitialiser le champ
      setTitleName('');

      alert('Titre ajouté avec succès!');
      navigate('/usertable')
    } catch (error) {
      console.error('Erreur lors de l\'ajout du titre', error);
      alert('Erreur lors de l\'ajout du titre. Veuillez réessayer.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Navbar />
      <Paper className={classes.paper} elevation={3}>
        <Typography style={{ color: 'black' }} component="h1" variant="h5">
          Modéle
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="modéle"
            name="title"
            value={titleName}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Enregistrer Modéle
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AddTitleForm;



