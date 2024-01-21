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

const AddColorForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [colorName, setColorName] = useState('');
  const [isColorAdded, setIsColorAdded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Faire une requête POST pour ajouter la couleur
      await axios.post('http://localhost:8080/colors/add', colorName, {
        headers: {
          'Content-Type': 'text/plain',
        },
      });

      // Marquer l'ajout comme réussi
      setIsColorAdded(true);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la couleur:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Typography component="h1" variant="h5">
          {isColorAdded ? 'Color Added' : 'Add Color'}
        </Typography>
        {isColorAdded ? (
          <Typography variant="body1" color="textSecondary">
            Color: {colorName}
          </Typography>
        ) : (
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="colorName"
              label="Color "
              name="colorName"
              value={colorName}
              onChange={(e) => setColorName(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Enregitre Color
            </Button>
          </form>
        )}
      </Paper>
    </Container>
  );
};

export default AddColorForm;





