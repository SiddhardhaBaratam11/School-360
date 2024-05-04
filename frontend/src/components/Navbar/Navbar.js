import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Card, Button, makeStyles, Typography } from '@material-ui/core';
import './navbar.css'

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: '#00FFFF',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
    minHeight: '1vh', // Set minimum height to cover the entire viewport
  },
  button: {
    backgroundColor: 'green',
    color: 'white',
    marginRight: theme.spacing(1),
  },
  box: {
    position: 'relative',
    width: '300px',
    height: '400px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#060c21',
  },
  content: {
    padding: '20px',
    boxSizing: 'border-box',
    color: '#fff',
    textAlign: 'center',
  },
}));

function Home() {
  const classes = useStyles();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    <div>
      <Card className={classes.card}>
        <Typography variant="h6" style={{ fontWeight: 'bold', color: 'black' }}>
          School 360
        </Typography>
        <div>
          <Button variant="contained" className={classes.button} component={NavLink} to="login">
            Login
          </Button>
          <Button variant="contained" className={classes.button} component={NavLink} to="signup">
            Signup
          </Button>
        </div>
        <Outlet />
      </Card>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      {isHomePage && (
      <div class="box">
      <div class="content">
        <h1 style={{ fontSize: '52px' }}> School 360</h1>
        <br/>
        <p style={{ fontSize: '20px' }}>Empower education with innovative management, be a beacon of efficiency, and watch success and honor gravitate towards your commitment to advancing learning.</p>
      </div>
    </div>
      )}
    </div>
  );
}

export default Home;
