import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
  TextField,
  TablePagination,
  IconButton
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { NavLink, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import userAuth from '../utils/userAuth';

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {   
      // Fetch products from your API only if authToken is present
      fetch('http://localhost:8080/products/')
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error('Error fetching products:', error));
    
  }, [navigate]);

  useEffect(() => {
    // Filter products based on the search term
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products, searchTerm]);

  const handleEditProduct = (productId) => {
    navigate(`/putproduct/${productId}`);
  };

  const handleDeleteProduct = (productId) => {
    // Send a DELETE request to your API to delete the product
    axios
      .delete(`http://localhost:8080/products/delete/${productId}`)
      .then(() => {
        // If the deletion is successful, update the state to remove the deleted product
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
      })
      .catch((error) => console.error('Error deleting product:', error));
  };

  const handleSearch = () => {
    // Trigger the search based on the input search term
    setRowsPerPage(10); // Reset rowsPerPage to default when searching
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Navbar />
      <TextField
        label="Search by marque"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        style={{ marginBottom: '20px', marginLeft: 'auto'  }}
        startIcon={<SearchIcon style={{ fontSize: 40 }} />}
      ></Button>



<Button
  variant="contained"
  color="primary"
  style={{
    borderRadius: '50%',
    padding: '10px',
    marginLeft: '200px',
  }}
  startIcon={<AddIcon />}
  onClick={() => navigate('/addproduct')}
>
  Add car
</Button>


    {/* Ajoutez ici d'autres boutons avec des icônes si nécessaire */}
  




      <Grid container spacing={3}>
        {filteredProducts
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{product.title}</Typography>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                  <Typography>${product.price}</Typography>
                  <Typography>{product.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="yellow"
                    onClick={() => handleEditProduct(product.id)}
                  >
                    <EditIcon />
                    
                  </Button>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <DeleteIcon />
                    
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredProducts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default userAuth(ProductsTable);