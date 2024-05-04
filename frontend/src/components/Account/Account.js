import React, { useEffect } from 'react';
import UserContext from '../../Context/UserContext';
import { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Admin from '../Admin/Admin';
import StudentFunctionality from '../StudentFunctionality/StudentRole'
import ParentFunctionality from '../ParentFunctionality/ParentRole'
import GradingManagement from '../Grading/gradeManagement';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../Admin/theme';
import TeacherManagement from '../Teacher/TeacherRole';

function Account() {
    const { user, logout, setUsertoken, usertoken } = useContext(UserContext);
    const nav = useNavigate();

    useEffect(() => {
        if (!user) {
            // Redirect to login if user is not logged in
            nav('/login');
        }
    }, [user, nav]);

    const getUserFunctionality = (role) => {
        switch (role) {
            case 'student':
                return <ThemeProvider theme={theme}> <StudentFunctionality /> </ThemeProvider>;
            case 'teacher':
                return <ThemeProvider theme={theme}> <TeacherManagement /> </ThemeProvider>;
            case 'parent':
                return <ThemeProvider theme={theme}> <ParentFunctionality/></ThemeProvider>;
            case 'administrator':
                return <ThemeProvider theme={theme}> <Admin /> </ThemeProvider>;
            default:
                return 'Unknown role';
        }
    };

    return (
        <div>
            {user ? (
                <div>
                    <div>
                        {getUserFunctionality(user.role)}
                    </div>
                </div>
            ) : (
                <p>Please log in to view your account.</p>
            )}
        </div>
    );
}

export default Account;
