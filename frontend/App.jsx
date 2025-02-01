import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';

// Components
import Home from './pages/Home';
import Navbar from './components/Navbar'
import Footer from './components/Footer'


function App() {


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spots/:id" element={<SpotDetails />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
