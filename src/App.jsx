import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <Navbar />

      <div className="header-container container">
        <header className='column'>

          <div className="column title">
            <div className="row headings">
              <h1>Laptopistim</h1>
              <h1>//</h1>
              <h1 className='h1-hb'>לפטופיסטים</h1>
            </div>

            <div className="row subtitle">
              <hr/>
              <h2>noun</h2>
            </div>
          </div>

          <div className="column definitions">
            <div className="column">
              <p className="def-title"><span className="def-title-num">1.</span> Serial caffeinator</p>
              <p className="def-body">Someone who sits in a cafe all day, glued to their laptop, working on their next big thing while sipping soya-milk coffee.</p>
            </div>

            <div className="column">
              <p className="def-title"><span className="def-title-num">2.</span> Workplace nomad</p>
              <p className="def-body">A modern day remote worker seeking the perfect balance of caffeine, reliable WiFi, good vibes, and affordable prices.</p>
            </div>
          </div>

          <div className="row btn-row">
            <button className="primary">Find a cafe to work from</button>
            <button className="secondary">Add your cafe</button>
          </div>

        </header>
      </div>
    </>
  )
}

export default App
