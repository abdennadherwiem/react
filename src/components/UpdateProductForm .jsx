import React, { useState, useEffect } from 'react';
import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Container,
  TextField,
  Typography,
  Paper,
  makeStyles,
} from '@material-ui/core';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paper: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const UpdateProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
    rating: '',
  });

  const [titles, setTitles] = useState([]);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/titles/all');
        setTitles(response.data);
      } catch (error) {
        console.error('Error fetching titles:', error.message);
      }
    };

    fetchTitles();
  }, []);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProductData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/products/update/${id}`, formData);
      navigate('/pp');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <Paper elevation={3} className={classes.paper}>
        <Typography component="h1" variant="h5">
          Update car
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <FormControl fullWidth variant="outlined" margin="normal" required>
            <InputLabel htmlFor="title">Marque</InputLabel>
            <Select
              label="Marque"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            >
              {titles.map((title) => (
                <MenuItem key={title} value={title}>
                  {title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="price"
            label="Price"
            name="price"
            value={formData.price}
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
            value={formData.description}
            onChange={handleInputChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="category"
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="image"
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="rating"
            label="Rating"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update car
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default UpdateProductForm;

