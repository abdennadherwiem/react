import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  Select,
  MenuItem,
  InputLabel,
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

const AddProductForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
    rating: '',
  });

  const [titleList, setTitleList] = useState([]);
  const [modelList, setModelList] = useState([]);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/titles/all');
        setTitleList(response.data);
      } catch (error) {
        console.error('Error fetching titles:', error);
      }
    };

    const fetchModels = async () => {
      try {
        const response = await axios.get('http://localhost:8080/models/all');
        setModelList(response.data);
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };

    fetchTitles();
    fetchModels();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Faire une requête POST pour ajouter le produit
      await axios.post('http://localhost:8080/products/add', formData);

      // Rediriger vers la page d'accueil après l'ajout réussi
      navigate('/pp');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit :', error);
    }
  };

  return (
    
    <Container component="main" maxWidth="xs">
      <Navbar />
      <Paper className={classes.paper} elevation={3}>
        <Typography component="h1" variant="h5" style={{color:'black'}}>
          Ajouter car
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <InputLabel htmlFor="title">Marque</InputLabel>
          <Select
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          >
            {titleList.map((title) => (
              <MenuItem key={title.id} value={title.name}>
                {title.name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="price"
            label="Prix"
            name="price"
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="description"
            label="Description"
            name="description"
            multiline
            rows={3}
            onChange={handleInputChange}
          />
          <InputLabel htmlFor="category">Model</InputLabel>
          <Select
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            {modelList.map((model) => (
              <MenuItem key={model} value={model}>
                {model}
              </MenuItem>
            ))}
          </Select>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="image"
            label="URL de l'image"
            name="image"
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="rating"
            label="Évaluation"
            name="rating"
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Ajouter car
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AddProductForm








