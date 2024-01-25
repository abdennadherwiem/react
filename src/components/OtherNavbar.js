// OtherNavbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  nav: {
    backgroundColor: 'white',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1001,
  },
  logo: {
    width: '50px',
  },
  button: {
    color: theme.palette.secondary.contrastText,
    margin: '0 10px',
    '&:hover, &:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
  searchTextField: {
    width: '300px',
    backgroundColor: 'white',
  },
}));

const OtherNavbar = () => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <nav className={classes.nav}>
      <img src="../asset/other-logo.png" alt="Logo" className={classes.logo} />
      <div>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          className={classes.searchTextField}
        />
        <Button component={Link} to="/otherPage1" className={classes.button}>
          Page 1
        </Button>
        <Button component={Link} to="/otherPage2" className={classes.button}>
          Page 2
        </Button>
        {/* ... Add more buttons as needed ... */}
      </div>
    </nav>
  );
};

export default OtherNavbar;

