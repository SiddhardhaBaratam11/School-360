import React, { useState } from 'react';
import { AppBar, Button, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Divider, IconButton, ListItemButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { makeStyles } from '@mui/styles';
import StudentManagement from '../StudentEnrollment/StdManagement';
import StaffManagement from '../Staff/StaffManagementForm';
import FeeManagement from '../Fee/FeeManagementForm';
import AcademicManagement from '../Academics/AcademicManagementForm';
import GradingManagement from '../Grading/gradeManagement';
import theme from './theme';
import UserContext from '../../Context/UserContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
 drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#00FFFF !important',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Admin = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const { logout } = useContext(UserContext);

  const renderComponent = () => {
    switch (selectedOption) {
      case 'students':
        return <StudentManagement />;
      case 'staff':
        return <StaffManagement />;
      case 'fees':
        return <FeeManagement />;
      case 'academic':
        return <AcademicManagement />;
      case 'grading':
        return <GradingManagement />;
      default:
        return null;
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logout successful');
  };


  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button style={{ backgroundColor: 'red', color: 'white' }} color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
  {['students', 'staff', 'fees', 'academic', 'grading'].map((text) => (
    <ListItem
      button
      key={text}
      onClick={() => setSelectedOption(text)}
      className={classes.drawerButton}
      style={{ backgroundColor: 'green', color: 'white' ,borderBottom: '1px solid #ccc', paddingLeft: 16, borderRadius: 10}} // Set your desired background color
    >
      <ListItemText primary={text.charAt(0).toUpperCase() + text.slice(1)} />
    </ListItem>
  ))}
</List> 

      </Drawer>
      <main className={classes.content}>
        <div className={classes.drawerHeader} />
        {renderComponent()}
      </main>
    </div>
  );
}  

export default Admin;
