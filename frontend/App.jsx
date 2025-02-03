import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import useToken from './scripts/useToken';

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home';
import Spots from './pages/Spots'
import Spot from './pages/Spot';

import Account from './pages/Account';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {

  const { token, setToken } = useToken()

  return (
    <Router>
      <Navbar token={token} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spots/" element={<Spots />} />
        <Route path="/spots/:id" element={<Spot />} />

        <Route path="/account/" element={token ? <Account /> : <Login setToken={setToken}  />} />
        <Route path="/login/" element={token ? <Navigate to="/account" /> : <Login setToken={setToken} />} />
        <Route path="/register/" element={token ? <Navigate to="/account" /> : <Register setToken={setToken} />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App