import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TablePagination, TextField, Button, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import adminAuth from '../utils/adminAuth';
import SearchIcon from '@material-ui/icons/Search';
import StatisticsCard from './StatisticsCard';
import './UserTable.css';
import ChartComponent from './ChartComponent';
//import MixedChartExample from './MixedChartExample';
import BarChart from '../components/BarChart';
import ColorList from './ColorList';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0); // Nouvel état
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
    const fetchUsersCount = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/count');
        setTotalUsers(response.data);
      } catch (error) {
        console.error('Error fetching users count:', error.message);
      }
    };

    fetchUsersCount();
  }, []);

  useEffect(() => {
    const fetchProductsCount = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products/count');
        setTotalProducts(response.data);
      } catch (error) {
        console.error('Error fetching products count:', error.message);
      }
    };

    fetchProductsCount();
  }, []); // Le deuxième argument est une liste vide pour n'exécuter cet effet qu'une fois

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [users, searchTerm]);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/user/delete/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdateUser = (userId) => {
    navigate('/putuser/' + userId);
  };

  const handleSearch = () => {
    setRowsPerPage(10);
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
    <div className="dashboard-container">
      <Navbar />
      <div className="main-container">
      <div style={{ display: 'flex', alignItems: 'center' }}>
  <img src="https://cdn-icons-png.flaticon.com/512/4305/4305482.png" alt="dd" style={{ width: '25px', marginLeft: '1000px', marginTop: '-17px' }} />
  <img src="https://cdn-icons-png.flaticon.com/512/1057/1057231.png" alt="dd" style={{ width: '25px', marginLeft: '10px' , marginTop: '-17px'}} />
</div>

        {/*<div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="https://cdn-icons-png.flaticon.com/512/149/149431.png" alt="dd" style={{ width: '40px', marginRight: '10px' }} />
          <Typography variant="h5" style={{ color: 'black', fontWeight: 'bold' }}>Dashboard</Typography>
          <img src="https://media4.giphy.com/media/MhDorQPTUPjpZfkAkZ/giphy.gif?cid=ecf05e47oxkxn0h6l58i3vb0snoezxpr1n41eogqy14wmxsb&ep=v1_stickers_search&rid=giphy.gif&ct=s" alt="dd" style={{ width: '150px'}}></img>

  </div>*/}
        
        <div className="search-bar-container" style={{ marginTop: '5px', marginBottom: '-12px' }} >
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <img src="https://cdn-icons-png.flaticon.com/512/149/149431.png" alt="dd" style={{ width: '30px', marginRight: '10px' }} />
    <Typography variant="h5" style={{ color: 'black', fontWeight: 'bold' }}>Dashboard</Typography>
    <img src="https://media4.giphy.com/media/MhDorQPTUPjpZfkAkZ/giphy.gif?cid=ecf05e47oxkxn0h6l58i3vb0snoezxpr1n41eogqy14wmxsb&ep=v1_stickers_search&rid=giphy.gif&ct=s" alt="dd" style={{ width: '150px'}}></img>
  </div>

  <TextField
    label="Search "
    variant="outlined"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{ marginLeft: 'auto', marginRight: '-431px' }} 
  />
  <Button
    variant="contained"
    color="primary"
    onClick={handleSearch}
    startIcon={<SearchIcon style={{ fontSize: 40 }} />}
    style={{ marginLeft: 'auto', marginRight: '10px' }}  
  ></Button>
</div>

        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
          <StatisticsCard title="Total Users" value={totalUsers} color="blue" icon="https://cdn-icons-png.flaticon.com/512/1057/1057231.png" />
          <StatisticsCard title="Total car" value={totalProducts} color="blue" icon="https://png.pngtree.com/png-clipart/20230818/original/pngtree-blue-car-icon-auto-cartoon-picture-image_8016991.png"/>
          <StatisticsCard title="Analytics" value="300" color="blue" icon="https://cdn-icons-png.freepik.com/512/7731/7731130.png" />
        </div>

        <div className="charts-container" style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '-17px'  }}>
        <ChartComponent style={{ marginRight: '50px' }} />
        <BarChart />
        <ColorList />

  </div>
  
  




  <div className="search-bar-container" style={{ marginTop: '2px', marginBottom: '20px' }} >
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <img src="https://cdn-icons-png.flaticon.com/512/149/149431.png" alt="dd" style={{ width: '30px', marginRight: '10px' }} />
    <Typography variant="h5" style={{ color: 'black', fontWeight: 'bold' }}>Recent Users</Typography>
    <img src="https://media4.giphy.com/media/MhDorQPTUPjpZfkAkZ/giphy.gif?cid=ecf05e47oxkxn0h6l58i3vb0snoezxpr1n41eogqy14wmxsb&ep=v1_stickers_search&rid=giphy.gif&ct=s" alt="dd" style={{ width: '150px'}}></img>
  </div>

  <TextField
    label="Search "
    variant="outlined"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{ marginLeft: 'auto', marginRight: '-431px' }} 
  />
  <Button
    variant="contained"
    color="primary"
    onClick={handleSearch}
    startIcon={<SearchIcon style={{ fontSize: 40 }} />}
    style={{ marginLeft: 'auto', marginRight: '10px' }}  
  ></Button>
</div>


        {/*<div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="https://cdn-icons-png.flaticon.com/512/149/149431.png" alt="dd" style={{ width: '40px', marginRight: '10px' }} />
          <Typography variant="h5" style={{ color: 'black', fontWeight: 'bold' }}>Recent Users</Typography>
</div>*/}
        <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
          <Table size="small">
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
                        style={{ color: 'yellow', fontSize: '20px' }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteUser(user.id)}
                        style={{ color: 'red', fontSize: '20px' }}
                      >
                        <DeleteIcon />
                      </IconButton>
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
    </div>
  );
};

export default adminAuth(UserTable); 