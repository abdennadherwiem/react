import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  TextField,
  Button,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility'; // Import de l'icône de vue
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

import SearchIcon from '@material-ui/icons/Search';
import adminAuth from '../utils/adminAuth';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Filter users based on the search term
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [users, searchTerm]);

  const handleDeleteUser = async (userId) => {
    try {
      // Make a DELETE request to delete the user
      await axios.delete(`http://localhost:8080/user/delete/${userId}`);

      // Remove the deleted user from the state
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdateUser = (userId) => {
    navigate('/putuser/' + userId);
  };

  {/*const handleViewUser = (userId) => {
    navigate('/viewuser/' + userId); // Ajoutez votre route de vue utilisateur
  };*/}

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
        label="Search by Email"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        style={{ marginBottom: '20px' }}
        startIcon={<SearchIcon style={{ fontSize: 40 }} />}
      ></Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleUpdateUser(user.id)}
                      style={{ color: 'yellow', fontSize: '50px' }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteUser(user.id)}
                      style={{ color: 'red', fontSize: '50px' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    {/*<IconButton
                      onClick={() => handleViewUser(user.id)}
                      style={{ color: 'green', fontSize: '50px' }}
              >
                      <VisibilityIcon />
              </IconButton>*/}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default adminAuth(UserTable);


