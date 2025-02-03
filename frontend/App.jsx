import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home';
import Spots from './pages/Spots'
import Spot from './pages/Spot';
import Dashboard from './pages/Dashboard';
import Preferences from './pages/Preferences';
import Login from './pages/Login';


function setToken(userToken){
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken(){

}

function App() {

  const token = getToken()
  

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spots/" element={<Spots />} />
        <Route path="/spots/:id" element={<Spot />} />
        <Route path="/dashboard/" element={<Dashboard />} />
        <Route path="/preferences/" element={<Preferences />} />
        <Route path="/login/" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App