import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Card, CardContent, Button, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: '#00FFFF',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
  },
  button: {
    backgroundColor: 'green',
    color: 'white',
    marginRight: theme.spacing(1),
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
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
    
  );
}

export default Navbar;
