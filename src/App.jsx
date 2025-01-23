import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import TempCover from './assets/temp-cover.jpg'

function App() {

  return (
    <>
      <Navbar />

      <header>
        <div className="container">
          <div className="h-left">
            <div id="h-title">
              <h1>Laptopistim</h1>
              <h1 className="h-divider">//</h1>
              <h1 className='h-hebrew-title'>לפטופיסטים</h1>
            </div>
            <li className="h-verb"><h3>Verb</h3></li>
            <ol>
              <li><b>Lorem ipsum dolor sit amet, consectetur adipisici elitz</b><br /><br />
                sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Me non paenitet nullum festiviorem excogitasse ad hoc. Ambitioni dedisse scripsisse iudicaretur. Unam incolunt Belgae, aliam Aquitani, tertiam.</li>
              <li><b>Lorem ipsum dolor sit amet, consectetur adipisici elitz</b><br /><br />
                sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Me non paenitet nullum festiviorem excogitasse ad hoc. Ambitioni dedisse scripsisse iudicaretur. Unam incolunt Belgae, aliam Aquitani, tertiam.</li>
            </ol>
          </div>
          <div className="h-right">
            <div className="suggested-spot" id='suggested-spot-prev'>
              <img src={TempCover} alt="Cafe preview thumbnail" className="spot-thumb" />
              <div className="spot-details">
                <h3>La di da Cafè</h3>
                <p>This is a very nice cafe located somewhere or rather in Tel Aviv. Idea Location. Very tasty coffee.</p>
                <button className="primary">View</button>
              </div>
            </div>
            <div className="suggested-spot" id='suggested-spot-active'>
              <img src={TempCover} alt="Cafe preview thumbnail" className="spot-thumb" />
              <div className="spot-details">
                <h3>Taim Meod</h3>
                <p>Coffee here could be labelled as taim meod as it is just so good! Definitely recomended.</p>
                <button className="primary">View</button>
              </div>
            </div>
            <div className="suggested-spot" id='suggested-spot-next'>
              <img src={TempCover} alt="Cafe preview thumbnail" className="spot-thumb" />
              <div className="spot-details">
                <h3>Ben Adams</h3>
                <p>A central hub for the ben adams of Israel. Not to be confused with Mr. Ben Adam (this one is way better)</p>
                <button className="primary">View</button>
              </div>
            </div>

            <div className="carousel-navigation">
              <div className='carousel-arrow' id="carousel-prev">↑</div>
              <div className="carousel-dots">
                <div className="carousel-dot"></div>
                <div className="carousel-dot active"></div>
                <div className="carousel-dot"></div>
                <div className="carousel-dot"></div>
              </div>
              <div className='carousel-arrow' id="carousel-next">↓</div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default App
