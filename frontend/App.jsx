import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home';
import Spots from './pages/Spots'
import Spot from './pages/Spot';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spots/" element={<Spots />} />
        <Route path="/spots/:id" element={<Spot />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App