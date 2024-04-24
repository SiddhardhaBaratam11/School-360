import {  useState } from "react";
import React, { useCallback } from 'react';
import Account from "./components/Account/Account";
import Navbar from "./components/Navbar/Navbar";
import UserContext from "./Context/UserContext";
import Signup from "./components/signup/Signup";
import Login from './components/Login/Login';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);
  const [usertoken, setUsertoken] = useState(null);
  const nav = useNavigate();

  const login = useCallback((userData) => {
    setUser(userData.user);
    setUsertoken(userData.token);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setUsertoken(null);
    nav('/');
  }, [nav]);

  return (
    <UserContext.Provider value={{ user, login, logout, usertoken, setUsertoken }}>
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path='/account' element={<Account />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App