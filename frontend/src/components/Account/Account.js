import React, { useEffect } from 'react';
import UserContext from '../../Context/UserContext';
import { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Admin from '../Admin/Admin';
import StudentFunctionality from '../StudentFunctionality/StudentRole'
import ParentFunctionality from '../ParentFunctionality/ParentRole'
import GradingManagement from '../Grading/gradeManagement';

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
                return <StudentFunctionality />;
            case 'teacher':
                return <GradingManagement />;
            case 'parent':
                return <ParentFunctionality/>;;
            case 'administrator':
                return <Admin/>;
            default:
                return 'Unknown role';
        }
    };

    return (
        <div>
            {user ? (
                <div>
                    <h2 style={{ color: 'white' }}>Welcome, {user.name}!</h2>
                    <p style={{ color: 'white' }}>Role: {user.role}</p>
                    <button style={{ backgroundColor: 'red', color: 'white' }} onClick={logout}>Logout</button>
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
