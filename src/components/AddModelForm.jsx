import React, { useState } from 'react';
import { Button, TextField, Typography, Paper, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const AddModelForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [modelName, setModelName] = useState('');
  const [isModelAdded, setIsModelAdded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Faire une requête POST pour ajouter le modèle
      await axios.post('http://localhost:8080/models/add', modelName, {
        headers: {
          'Content-Type': 'text/plain',
        },
      });

      // Marquer l'ajout comme réussi
      setIsModelAdded(true);
      alert("ajoute model avec succés");
      navigate('/ModelTable');
      
    } catch (error) {
      console.error('Erreur lors de l\'ajout du modèle :', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Typography component="h1" variant="h5">
          {isModelAdded ? 'Model Added' : 'Add Model'}
        </Typography>
        {isModelAdded ? (
          <Typography variant="body1" color="textSecondary">
            Model: {modelName}
          </Typography>
        ) : (
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="modelName"
              label="Model Name"
              name="modelName"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Add Model
            </Button>
          </form>
        )}
      </Paper>
    </Container>
  );
};

export default AddModelForm;






