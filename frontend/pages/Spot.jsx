import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Icons
import StatusCircle from '../assets/icons/status-circle.svg'
import WiFi from '../assets/icons/wifi.svg'
import Crowdedness from '../assets/icons/crowdedness.svg'
import PowerSockets from '../assets/icons/power-sockets.svg'
import Clock from '../assets/icons/clock.svg'

// Dynamic rating component
function Rating(props) {
  const ratingRounded = Math.round(props.ratingValue);

  return (
    <div className={`cf-rating ${props.ratingName}`}>
      <img className='cfr-icon' src={props.ratingIcon} />
      <div className="cfr-content">
        <h6>{props.ratingName}</h6>
          {        
            props.ratingValue != null ?
              <div className="rating-circle-row">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div 
                    key={num} 
                    className={`rr-circle ${num === ratingRounded ? "rr-circle-active" : ""}`}
                  ></div>
                ))}
              </div>
            : <p className='sd-subheading'>Not enough ratings.</p>
          }
      </div>
    </div>
  );
}

function Spot() {
  const { id } = useParams(); // Get the spot id from the URL
  const [spot, setSpot] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5200/spots/spot/${id}`)
      .then(res => res.json())
      .then(data => setSpot(data))
      .catch(err => console.error('Error fetching spot details:', err));
  }, [id]);

  if (!spot) {
    return <div>Loading...</div>;
  }

  return (
  <>
  <div className="header-container container">
    <header id='spot-header' className='column'>

        <div className="column title">
          <h1>{spot.name}</h1>

          <div className="row subtitle">
            <hr/>
            <h5>{spot.address}</h5>
          </div>
        </div>

        <img src={spot.image} alt={`${spot.name} image`} className="spot-cover-img" />

    </header>
  </div>

  <div className="container">
    <section id="spot-details" className='column'>

      <div id="about" className='column'>
        <h2 className='sd-h2'>About</h2>
        <p className='sd-p'>{spot.about}</p>
      </div>

      <div id="community-feedback" className='column'>

        <div className="cf-title column">
          <h2 className='sd-h2'>Community Feedback</h2>
          <p className="sd-subheading row">
            <img src={StatusCircle} />
            Based on {'{'}number{'}'} ratings
          </p>
        </div>

        <button className="secondary">Visited? <span className='cf-button-text-light'>Share your experience</span></button>

        <div className="cf-ratings column">

        <Rating ratingName="WiFi" ratingValue={spot.avg_wifi_rating} ratingIcon={WiFi} />
        <Rating ratingName="Occupancy" ratingValue={spot.avg_crowdedness_rating} ratingIcon={Crowdedness} />
        <Rating ratingName="Power Sockets" ratingValue={spot.avg_power_sockets_rating} ratingIcon={PowerSockets} />
        <Rating ratingName="Open Late" ratingValue={spot.avg_open_late_rating} ratingIcon={Clock} />

        </div>
      </div>

      <div id="comments">
      <h2 className='sd-h2'>Comments</h2>

      </div>

      <div id="share-your-experience">
      <h2 className='sd-h2'>Share Your Experience</h2>

      </div>

    </section>
  </div>
  </>
  );
}

export default Spot;
