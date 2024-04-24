import React, { useState } from 'react';
import { Card, CardContent, Button, makeStyles } from '@material-ui/core';
import StudentManagement from '../StudentEnrollment/StdManagement';
import StaffManagement from '../Staff/StaffManagementForm';
import FeeManagement from '../Fee/FeeManagementForm';
import AcademicManagement from '../Academics/AcademicManagementForm';
import GradingManagement from '../Grading/gradeManagement';

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: '#00FFFF', // Light gray background color
    marginBottom: theme.spacing(2),
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'green', // Light blue background color
    color: 'white',
    '&:hover': {
      backgroundColor: 'blue', // Dark blue background color on hover
    },
  },
}));

const Admin = () => {
  const classes = useStyles();
  const [selectedOption, setSelectedOption] = useState('students');

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

  return (
    <div>
      <h1 style={{ color: 'white' }}>Admin Dashboard</h1>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Button className={classes.button} onClick={() => setSelectedOption('students')}>Students</Button>
          <Button className={classes.button} onClick={() => setSelectedOption('staff')}>Staff</Button>
          <Button className={classes.button} onClick={() => setSelectedOption('fees')}>Fees</Button>
          <Button className={classes.button} onClick={() => setSelectedOption('academic')}>Academic</Button>
          <Button className={classes.button} onClick={() => setSelectedOption('grading')}>Grading</Button>
        </CardContent>
      </Card>
      {renderComponent()}
    </div>
  );
};

export default Admin;
