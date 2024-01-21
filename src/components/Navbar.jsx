import React from 'react';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
//import {home} from 'components/'

const useStyles = makeStyles((theme) => ({
  nav: {
    backgroundColor: theme.palette.primary.main,
    padding: '20px 0',
    display: 'flex',
    justifyContent: 'flex-end', // Align items to the right
  },
  button: {
    color: theme.palette.primary.contrastText,
    margin: '0 10px', // Equal spacing between buttons
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType')
    navigate('/LoginForm');
  };

  return (
    <nav className={classes.nav}>

      <p></p>
      {/*<Button onClick={() => navigate('/TitleTable')} className={classes.button}>
        marque
  </Button>*/}
  <Button onClick={() => navigate('/AddColorForm')} className={classes.button}>
         color
      </Button>
      <Button onClick={() => navigate('/AddModelForm')} className={classes.button}>
         Model
      </Button>
      <Button onClick={() => navigate('/AddTitleForm')} className={classes.button}>
         Marque
      </Button>
      <Button onClick={() => navigate('/pp')} className={classes.button}>
        Products
      </Button>
      <Button onClick={() => navigate('/usertable')} className={classes.button}>
        User Table
      </Button>
      <Button onClick={handleLogout} className={classes.button}>
        Logout
      </Button>
    </nav>
  );
};

export default Navbar;


