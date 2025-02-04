import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home';
import Spots from './pages/Spots'
import Spot from './pages/Spot';

import Register from './pages/Register';
import Login from './pages/Login';
import Account from './pages/Account';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spots/" element={<Spots />} />
        <Route path="/spots/:id" element={<Spot />} />

        <Route path="/register/" element={<Register />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/account" element={<Account />} />
        {/* <Route path="/account" element={isAuthenticated ? <Account /> : <Navigate to="/login" />} /> */}
      </Routes>
      <Footer />
    </Router>
  )
}

export default App