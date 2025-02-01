import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';

// Icons
import DoubleChevronRight from './assets/double-chevron-right.svg'
import MapPin from './assets/map-pin.svg'
import PowerSockets from './assets/power-sockets.svg'
import Crowdedness from './assets/crowdedness.svg'
import Clock from './assets/clock.svg'
import WiFi from './assets/WiFi.svg'

// City Imags
import TelAviv from './assets/cities/tel-aviv.png'
import Jerusalem from './assets/cities/jerusalem.png'
import Haifa from './assets/cities/haifa.png'
import RamatGan from './assets/cities/ramat-gan.png'

function App() {

  const cities = [{
    name: "Tel Aviv",
    image: TelAviv,
    spots: 35
  },
  {
    name: "Ramat Gan",
    image: RamatGan,
    spots: 8
  },
  {
    name: "Haifa",
    image: Haifa,
    spots: 15
  },
  {
    name: "Jerusalem",
    image: Jerusalem,
    spots: 12
  }]

  // Fetch 10 recent spots
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4769/spots/latest')
      .then(res => res.json())  // Parse response to JSON
      .then(data => setSpots(data))  // Update the 'spots' state with fetched data
      .catch(err => console.error('Error fetching spots:', err));  // Handle errors
  }, []);

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
        <section className='column' id='latest-spots'>

          <div className="ls-title row">
            <h2>Latest spots</h2>
            <button className="secondary">View All<img src={DoubleChevronRight} height="14"/></button>
          </div>

          <div id="ls-carousel">

          </div>

          {/* SPLIDE TEST */}

              <Splide hasTrack={false}
                options={ {
                  rewind: true,
                  gap: '30px',
                  arrows: true,
                  perPage: 3,
                  perMove: 1,
                  autoHeight: false,
                  pagination: false
                } }
                aria-label="My Favorite Images"
              >
                <SplideTrack>
                  {spots.map(spot => (
                    <SplideSlide>
                      <article key={spot.id} className="ls-card">
                        <img src={spot.image} alt={`${spot.name} image`} className='lsc-cover-img' />
                        <div className='lsc-info'>
                          <h3>{spot.name}</h3>
                          <div className="lsci-address">
                            <img src={MapPin} />
                            <a href={`https://www.google.com/maps/search/${spot.address}`}>
                              {spot.address}
                            </a>
                          </div>

                          {/* Conditional rendering based on feedback type averages */}
                          <ul className="row">

                            {spot.avgRatings['Power sockets'] >= 3 && (
                              <li>
                                <img src={PowerSockets} /> Power sockets
                              </li>
                            )}
                            
                            {spot.avgRatings['WiFi'] >= 3 && (
                              <li>
                                <img src={WiFi} /> WiFi
                              </li>
                            )}
                            
                            {spot.avgRatings['Open late'] >= 3 && (
                              <li>
                                <img src={Clock} /> Open late
                              </li>
                            )}

                            {spot.avgRatings['Crowdedness'] >= 3 && (
                              <li>
                                <img src={Crowdedness} /> Usually busy
                              </li>
                          )}
                        </ul>
                      </div>
                    </article>
                    </SplideSlide>
                  ))}
                </SplideTrack>
                
                <div className="splide__arrows row ls-carousel-arrows">
                  <button className="splide__arrow splide__arrow--prev slider-arrow">←</button>
                  <button className="splide__arrow splide__arrow--next slider-arrow">→</button>
                </div>

              </Splide>

          {/* END SPIDE TEST */}

        </section>
      </div>

      <div className="container">
        <section className='column' id="cities">

            <h2>Cities</h2>
            <div className="city-row row">

              {cities.map(city => {
                return (
                  <div key={city.name} className="city-card row">
                    <img className='city-img' src={city.image} alt={`${city.name} image`} />
                    <div className="city-info column">
                      <h3>{city.name}</h3>
                      <div className="city-stats row">
                      <img src={MapPin} />
                        {city.spots} spots
                      </div>
                    </div>
                  </div>
                )
              })}

            </div>

        </section>
      </div>

      <Footer />


    </>
  )
}

export default App
