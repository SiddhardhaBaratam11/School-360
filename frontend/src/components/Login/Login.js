import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import UserContext from '../../Context/UserContext';
import { useContext } from 'react';
import Account from '../Account/Account';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'

function Login() {
    const { login } = useContext(UserContext);
    const nav = useNavigate();
  
    const validationSchema = Yup.object().shape({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
      role: Yup.string(),
    });
  
    const submitForm = async (values, { setSubmitting }) => {
      try {
        const response = await axios.post('http://localhost:3007/login', {
          name: values.email,
          pswd: values.password,
        });
        const token = response.data.token;
        const userData = { user: response.data.user, token };
        login(userData);
        setSubmitting(false);
        nav('/account');
      } catch (error) {
        console.error('Login failed');
      }
    };
  
    return (
      <div>
        <Formik
          initialValues={{ email: '', password: '', role: '' }}
          validationSchema={validationSchema}
          onSubmit={submitForm}
        >
          {({ isSubmitting }) => (
            <div className="login-box">
            <h2>Login</h2>
            <Form>
              <div className="user-box">
                <Field type="email" name="email" id="email" />
                <label htmlFor="email">Email</label>
                <ErrorMessage name="email" component="div" className="error" />
              </div>
               <br/>
               
              <div className="user-box">
                <Field type="password" name="password" id="password" />
                <label htmlFor="password">Password</label>
                <ErrorMessage name="password" component="div" className="error" />
              </div>
              <br/>

              <button className="btn_submit" type="submit" disabled={isSubmitting}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Login
              </button>
            </Form>
            </div>
          )}
        </Formik>
      </div>
    );
  }
  
export default Login;
