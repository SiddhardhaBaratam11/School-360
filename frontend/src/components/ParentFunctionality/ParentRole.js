import React, { useState, useEffect } from 'react';
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
import UserContext from '../../Context/UserContext';
import { useContext } from 'react';
import axios from 'axios';
import FeeList from '../Lists/FeeList';
import GradeList from '../Lists/GradeList';
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


const ParentFunctionality = () => {
  const [fees, setFees] = useState([]);
  const [grades, setGrades] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('fees');
  const { logout } = useContext(UserContext);

  const renderComponent = () => {
    switch (selectedOption) {
      case 'fees':
        return <FeeList/>;
      case 'grading':
        return <GradeList />;
      default:
        return null;
    }
  };

  const fetchFees = async () => {
    try {
      const response = await axios.get('http://localhost:3007/fee');
      setFees(response.data);
    } catch (error) {
      console.error('Error fetching fees:', error);
    }
  };

  const fetchGrades = async () => {
    try {
      const response = await axios.get('http://localhost:3007/grading');
      setGrades(response.data);
    } catch (error) {
      console.error('Error fetching grades:', error);
    }
  };
  const handleLogout = () => {
    logout();
    toast.success('Logout successful');
  };

  return (
//     <div>
//       <h3 style={{ color: 'white' }}>Student Functionality</h3>
//       <div>
//         <h4 style={{ color: 'white' }}>Fees</h4>
//         <button style={{ backgroundColor: 'green', color: 'white' }}  onClick={fetchFees}>Fetch Fees</button>
//         <ul style={{ color: 'white' }}>
//           {fees.map((fee) => (
//             <li key={fee.id}>{fee.studentId} - {fee.amount}</li>
//           ))}
//         </ul>
//       </div>
//       <div>
//         <h4 style={{ color: 'white' }}>Grades</h4>
//         <button style={{ backgroundColor: 'green', color: 'white' }}  onClick={fetchGrades}>Fetch Grades</button>
//         <ul style={{ color: 'white' }}>
//           {grades.map((grade) => (
//             <li key={grade.id}>{grade.studentId} - {grade.grade}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };
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
      Parent Dashboard
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
{['fees','grading'].map((text) => (
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

export default ParentFunctionality;
