import { useEffect, useState } from 'react';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import Cities from '../components/Cities';

// Icons
import DoubleChevronRight from '../assets/icons/double-chevron-right.svg'
import MapPin from '../assets/icons/map-pin.svg'
import PowerSockets from '../assets/icons/power-sockets.svg'
import Crowdedness from '../assets/icons/crowdedness.svg'
import Clock from '../assets/icons/clock.svg'
import WiFi from '../assets/icons/WiFi.svg'

function Home(){
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    fetch('https://laptopistim.onrender.com/spots/latest-spots')
      .then(res => res.json())  // Parse response to JSON
      .then(data => setSpots(data))  // Update the 'spots' state with fetched data
      .catch(err => console.error('Error fetching spots:', err));  // Handle errors
  }, []);

  return (
    <>
    <div className="home-header-container header-container container">
      <header className='column'>

        <div className="column title">
          <div className="row headings">
            <h1>Laptopistim</h1>
            <h1 className='headings-divider'>//</h1>
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
          <a href='/spots' className="primary">Find a cafe to work from</a>
          <a href='/contribute' className="secondary">Add your cafe</a>
        </div>

      </header>
    </div>

    <div className="container">
      <section className='column' id='latest-spots'>

        <div className="ls-title row">
          <h2>Latest spots</h2>
          <a href='/spots' className="secondary">View All<img src={DoubleChevronRight} height="14"/></a>
        </div>

        <Splide hasTrack={false}
          options={ {
            rewind: true,
            gap: '30px',
            arrows: true,
            perPage: 3,
            perMove: 1,
            autoHeight: false,
            pagination: false,
            breakpoints: {
              580 : { perPage: 1, gap: 0 },
              950 : { perPage: 2, gap: 20 }
            },
          } }
          aria-label="My Favorite Images"
        >

          <SplideTrack>
            {spots.map(spot => (
              <SplideSlide key={spot.id}>
                <a className='spot-card-link' href={`/spots/${spot.id}`}>
                  <article className="ls-card">
                    <img src={spot.image} alt={`${spot.name} image`} className='lsc-cover-img' />
                    <div className='lsc-info'>
                      <h3>{spot.name}</h3>
                      <div className="lsci-address">
                        <img src={MapPin} />
                        <p>
                          {spot.address}
                        </p>
                      </div>

                      {/* Conditional rendering based on feedback type averages */}
                      <ul className="row">

                        {spot.avg_power_sockets_rating >= 3 && (
                          <li>
                            <img src={PowerSockets} /> Power sockets
                          </li>
                        )}
                        
                        {spot.avg_wifi_rating >= 3 && (
                          <li>
                            <img src={WiFi} /> WiFi
                          </li>
                        )}
                        
                        {spot.avg_open_late_rating >= 3 && (
                          <li>
                            <img src={Clock} /> Open late
                          </li>
                        )}

                        {spot.avg_crowdedness_rating >= 3 && (
                          <li>
                            <img src={Crowdedness} /> Usually busy
                          </li>
                      )}
                    </ul>
                  </div>
                  </article>
                </a>
              </SplideSlide>
            ))}
          </SplideTrack>
          
          <div className="splide__arrows row ls-carousel-arrows">
            <button className="splide__arrow splide__arrow--prev slider-arrow">←</button>
            <button className="splide__arrow splide__arrow--next slider-arrow">→</button>
          </div>

        </Splide>

      </section>
    </div>

    <div className="container">
      <section className='column' id="cities">

          <h2>Cities</h2>
          <Cities />

      </section>
    </div>
    </>
  );
};

export default Home;