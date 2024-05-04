import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import UserContext from '../../Context/UserContext';
import { useContext } from 'react';
import Account from '../Account/Account';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Signup() {
    const { user, login, setUsertoken, token } = useContext(UserContext);
    const nav = useNavigate();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        role: Yup.string().required('Role is required'),
    });

    const submitForm = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post('http://localhost:3007/signup', {
                name: values.email,
                pswd: values.password,
                role: values.role
            });
            const token = response.data.token;
            setUsertoken(token);
            login(response.data);
            setSubmitting(false);
            toast.success("Signed Up successfully!");
            nav('/login'); // Redirect to login page after successful signup
        } catch (error) {
            console.error('sign Up failed');
        }

    }

    return (
        <div>
            {!user ?
                <Formik
                    initialValues={{ email: '', password: '', role: '' }}
                    validationSchema={validationSchema}
                    onSubmit={submitForm}
                >
                    {({ isSubmitting }) => (
                        <div className="login-box">
                            <h2>Sign Up</h2>
                            <Form>
                                

                                <div className="user-box">
                                    <Field type="email" name="email" id="email" />
                                    <label htmlFor="email">Email</label>
                                    <ErrorMessage name="email" component="div" className="error" />
                                </div>

                                <div className="user-box">
                                    <Field type="password" name="password" id="password" />
                                    <label htmlFor="password">Password</label>
                                    <ErrorMessage name="password" component="div" className="error" />
                                </div>
                                <div className="user-box">
                                    
                                    <label htmlFor="role">Role</label> &nbsp;
                                    <br></br>
                                    <br></br>

                                    <Field as="select" name="role" id="role">
                                        <option value="">Select Role</option>
                                        <option value="student">Student</option>
                                        <option value="teacher">Teacher</option>
                                        <option value="parent">Parent</option>
                                        <option value="administrator">Administrator</option>
                                    </Field>
                                    <ErrorMessage name="role" component="div" className="error" />
                                </div>
                                <button className="btn_submit" type="submit" disabled={isSubmitting}>
                                    <span/>
                                    <span/>
                                    <span/>
                                    <span/>
                                    SignUp
                                </button>
                            </Form>
                        </div>
                    )}
                </Formik> : <Account />}
        </div>
    )
}

export default Signup;
