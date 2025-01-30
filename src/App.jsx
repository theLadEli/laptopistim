import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Slider from "react-slick";

// Images
import DoubleChevronRight from './assets/double-chevron-right.svg'
import MapPin from './assets/map-pin.svg'
import PowerSockets from './assets/power-sockets.svg'
import Crowdedness from './assets/crowdedness.svg'
import Clock from './assets/clock.svg'

// temp
import NehamaVehatziImg from './assets/nahama-vehatzi.png'
// /temp

function App() {

  const sliderSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

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
              <h5>noun</h5>
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

      <div className="container">
        <section id='latest-spots'>

          <div className="ls-title row">
            <h2>Latest spots</h2>
            <button className="secondary">View All<img src={DoubleChevronRight} height="14"/></button>
          </div>

          <div className="slider-container">
            <Slider {...sliderSettings}>

              <article className="ls-card">
                <img src={NehamaVehatziImg} alt="Nehama Vehatzi image" className='lsc-cover-img' />
                <div className='lsc-info'>
                  <h3>Nehama Vahetzi</h3>
                  <div className="lsci-address">
                    <img src={MapPin} />
                    Shenkin 43, Tel Aviv
                  </div>

                  <ul>
                    <li>
                      <img src={PowerSockets} /> Power sockets
                    </li>
                    <li>
                      <img src={Crowdedness} /> Usually busy
                    </li>
                    <li>
                      <img src={Clock} /> Open late
                    </li>
                  </ul>
                </div>
              </article>
              
              <article>
                <h2>2</h2>
              </article>
              <article>
                <h2>3</h2>
              </article>

            </Slider>
          </div>

        </section>
      </div>


    </>
  )
}

export default App
