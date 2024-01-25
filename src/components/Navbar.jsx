import React from 'react';
import { Link } from 'react-router-dom';
import { Button, IconButton, Typography, Divider } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import StoreIcon from '@material-ui/icons/Store';
import CommuteIcon from '@material-ui/icons/Commute';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  nav: {
    backgroundColor: theme.palette.primary.main,
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '200px',
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    zIndex: 1000,
  },
  title: {
    color: theme.palette.primary.contrastText,
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
    textTransform: 'uppercase', // Mettre en majuscules
  },
  homeButton: {
    backgroundColor: 'white',
    color: 'black',
    margin: '10px 0',
    width: '100%',
    textAlign: 'left',
  },
  button: {
    color: theme.palette.primary.contrastText,
    margin: '10px 0',
    width: '100%',
    textAlign: 'left',
    '&:hover, &:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
  icon: {
    marginRight: '10px',
  },
  divider: {
    width: '100%',
    margin: '7px 0',
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <nav className={classes.nav} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
      <img src="https://media2.giphy.com/media/xUA7aKMml6zIS2Qle8/giphy.gif?cid=ecf05e47d5krhr23pcd576f8x8kv8olqz0i7h5u9bqvqosxk&ep=v1_stickers_search&rid=giphy.gif&ct=s" alt="dd" style={{width:'100px',marginRight:'10px'}}/>
      <Divider className={classes.divider} />
      <IconButton component={Link} to="/userTable" className={classes.homeButton}>
        <HomeIcon className={classes.icon} />
        Home
      </IconButton>
      <Divider className={classes.divider} />
      <Button component={Link} to="/pp" className={classes.button}>
        <StoreIcon className={classes.icon} />
        cars
      </Button>
      <Divider className={classes.divider} />
      <Button component={Link} to="/addproduct" className={classes.button}>
     
      <DriveEtaIcon className={classes.icon} />
        Add car
      </Button>
      <Divider className={classes.divider} />
      <Button component={Link} to="/AddTitleForm" className={classes.button}>
      <CommuteIcon className={classes.icon} />
        Modéle
      </Button>
      <Divider className={classes.divider} />
      
      
      <Button component={Link} to="/addColorForm" className={classes.button}>
        <ColorLensIcon className={classes.icon} />
        Color
      </Button>
      
      {/*<Button component={Link} to="/addModelForm" className={classes.button}>
        <DriveEtaIcon className={classes.icon} />
        Model
  </Button>*/}
      
      <Divider className={classes.divider} />
      <Button component={Link} to="/LoginForm" className={classes.button} style={{ marginTop: '80px' }} >
      <ExitToAppIcon className={classes.icon} />
        Logout
      </Button>
      <Divider className={classes.divider} />
    </nav>
  );
};

export default Navbar;

