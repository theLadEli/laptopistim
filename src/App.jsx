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
import ComingSoon from './pages/ComingSoon'

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
        <Route path="/about/" element={<ComingSoon description="This page is still a work in progress. You'll soon find here a bit about me, the developer :) and the purpose of this website along with how you can help!" />} />
        <Route path="/contribute/" element={<ComingSoon description="This page is still a work in progress. If you own a cafe, or just know of a spot you'd like to share with others, you'll soon be able to publish the cafe profile on Laptopistim! Contributions like these is what makes this website so great, a community powered website." />} />
        <Route path="/contact/" element={<ComingSoon description="If you have any questions, recomendations or feedback you'll shortly be able to submit them here. But if it's anything more pressing or you just need a way to reach out in the interim, send me an email at eli@echocreations.co.uk. Thanks." />} />

        <Route path="/register/" element={isAuthenticated ? <Navigate to="/account" /> : <Register />} />
        <Route path="/login/"  element={isAuthenticated ? <Navigate to="/account" /> : <Login />} />
        <Route path="/account" element={isAuthenticated ? <Account /> : <Navigate to="/login" />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App