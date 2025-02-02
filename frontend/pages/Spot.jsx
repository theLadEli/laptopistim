import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Components
import Rating from '../components/Rating';

// Icons
import StatusCircle from '../assets/icons/status-circle.svg'
import WiFi from '../assets/icons/wifi.svg'
import Crowdedness from '../assets/icons/crowdedness.svg'
import PowerSockets from '../assets/icons/power-sockets.svg'
import Clock from '../assets/icons/clock.svg'

// Date formatting (for comment post date)
function formatDate(dateString) {
  const date = new Date(dateString);
  
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

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
    return <div id='spot-loading'>Loading...</div>;
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

      <div id="comments" className='column'>

      <div className="cf-title column">
          <h2 className='sd-h2'>Comments</h2>
          <p className="sd-subheading row">
            <img src={StatusCircle} />
            {spot.comments.length} comments
          </p>
        </div>

        <div className="comments-list column">
          {spot.comments.map((comment) => (
              <div className="cl-comment" key={comment.id}>
                <div className="cl-author-initial">{comment.first_name.slice(0, 1)}</div>
                <div className="clc-content">
                  <p>{comment.comment}</p>
                  <p className='cl-comment-date'>{formatDate(comment.created_at)}</p>
                </div>
              </div>
          ))}
        </div>
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
