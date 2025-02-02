import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home';
import Spot from './pages/Spot';
import SignUp from './pages/SignUp'

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spots/:id" element={<Spot />} />
        <Route path="/sign-up/" element={<SignUp />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App