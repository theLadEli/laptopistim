import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../styles/pages/spot.css'

// Components
import Rating from '../components/Rating';

// Icons
import StatusCircle from '../assets/icons/status-circle.svg'
import wifi from '../assets/icons/wifi.svg'
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
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const [refresh, setRefresh] = useState(0);
  const [submitRating, setSubmitRating] = useState(false)

  const [spot, setSpot] = useState(null);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  
  const [wifiRating, setWifiRating] = useState()
  const [powerSocketRating, setPowerSocketRating] = useState()
  const [occupancyRating, setOccupancyRating] = useState()
  const [openLateRating, setOpenLateRating] = useState()
  const [ratingError, setRatingError] = useState('');

  const userId = user?.id;

  useEffect(() => {
    fetch(`https://laptopistim.onrender.com/spots/spot/${id}`)
      .then(res => res.json())
      .then(data => setSpot(data))
      .catch(err => console.error('Error fetching spot details:', err));
  }, [id, refresh]);

  if (!spot) {
    return <div id='spot-loading'>Loading...</div>;
  }

  async function handlSubmitRatings(e) {
    e.preventDefault();

    try {
      const postRatings = await fetch("https://laptopistim.onrender.com/spots/spot-ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, id, wifiRating, powerSocketRating, occupancyRating, openLateRating }),
      });

      if (!postRatings.ok) {
        throw new Error(`HTTP error! Status: ${postRatings.status}`);
      }

      const postRatingsData = await postRatings.json();
      setRefresh(prev => prev + 1);
      setSubmitRating(false)
      setRatingError('')
    } catch (error) {
      console.error("Error submitting ratings:", error, error.message, error.stack);
      setRatingError("Failed to submit rating. Please try again later.")
    }
  }

  async function handlePostComment(e){
    e.preventDefault();
    if (title == '') {
      return setError('Please input a title to submit your feedback.')
    };
    if (comment == '') {
      return setError('Please provide your comment to submit feedback.')
    };
    
    const response = await fetch("https://laptopistim.onrender.com/spots/spot-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, id, title, comment }),
    });

    try {
      const data = await response.json();
      setRefresh(prev => prev + 1);
      setTitle('');
      setComment('');
      setError('')
    } catch (error) {
      setError(error)
    }
  }

  return (
  <>
  <header className='column'>

      <div className="column title">
        <h1>{spot.name}</h1>

        <div className="row subtitle">
          <hr/>
          <h4>{spot.address}</h4>
        </div>
      </div>

      <img src={spot.image} alt={`${spot.name} image`} className="spot-cover-img" />

  </header>

  <section id="spot-details" className='column'>

    <div id="about" className='column'>
      <h3>About</h3>
      <p className='sd-p'>{spot.about}</p>
    </div>

    <div id="community-feedback" className='column'>

      <div className="cf-title column">
        <h3>Community Feedback</h3>
        <p className="sd-subheading row">
          <img src={StatusCircle} />
          Based on {'{'}number{'}'} ratings
        </p>
      </div>

      { !submitRating &&
        <button className="secondary" onClick={() => setSubmitRating(true)}>Visited? <span className='cf-button-text-light'>Share your experience</span></button>
      }

      { submitRating && (
        isAuthenticated ?
            <form id='submit-ratings' className='cf-ratings column' onSubmit={handlSubmitRatings}>
              <label className='cfr-content'>WiFi
                <div className="rating-circle-row">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <input key={num} type="radio" name="wifi-radio" value={num} onChange={(e) => setWifiRating(e.target.value)} />
                  ))}
                </div>
              </label>
              <label className='cfr-content'>Power Sockets
                <div className="rating-circle-row">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <input key={num} type="radio" name="power-sockets-radio" value={num} onChange={(e) => setPowerSocketRating(e.target.value)} />
                  ))}
                </div>
              </label>
              <label className='cfr-content'>Occupancy
                <div className="rating-circle-row">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <input key={num} type="radio" name="occupancy-radio" value={num} onChange={(e) => setOccupancyRating(e.target.value)} />
                  ))}
                </div>
              </label>
              <label className='cfr-content'>Open Late
                <div className="rating-circle-row">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <input key={num} type="radio" name="open-late-radio" value={num} onChange={(e) => setOpenLateRating(e.target.value)} />
                  ))}
                </div>
              </label>

              <input className='primary' type="submit" value="Submit" />
              {ratingError  && <p style={{ color: "red" }}>{ratingError}</p>}
            </form>
            : 
            <>
              <p>You need to be logged in to leave feedback.</p>
              <a href="/login" className="primary">Log in</a>
            </>
        )
      }

    { !submitRating &&
      <div className="cf-ratings column">

        <Rating ratingName="WiFi" ratingValue={spot.avg_wifi_rating} ratingIcon={wifi} />
        <Rating ratingName="Occupancy" ratingValue={spot.avg_crowdedness_rating} ratingIcon={Crowdedness} />
        <Rating ratingName="Power Sockets" ratingValue={spot.avg_power_sockets_rating} ratingIcon={PowerSockets} />
        <Rating ratingName="Open Late" ratingValue={spot.avg_open_late_rating} ratingIcon={Clock} />

      </div>
    }
    </div>

    <div id="comments" className='column'>

    <div className="cf-title column">
        <h3>Comments</h3>
        <p className="sd-subheading row">
          <img src={StatusCircle} />
          {spot.comments.length} comments
        </p>
      </div>

      <div className="comments-list column">
        {spot.comments.map((comment) => (
            <div className="cl-comment" key={comment.id}>
              <div className="cl-author-initial">{comment.first_name.slice(0, 1)}</div>
              <div className="cl-comment-author-wrapper">
                <div className="clc-content">
                  <p>{comment.comment}</p>
                  <p className='cl-comment-date'>{formatDate(comment.created_at)}</p>
                </div>
                <p className='cl-author-fname'>{comment.first_name}</p>
              </div>
            </div>
        ))}
      </div>
    </div>

    <div id="share-your-experience" className='column'>
      <h3>Share Your Experience</h3>

        { isAuthenticated ?
            <form onSubmit={handlePostComment} className='column' id='spot-feedback-form'>

              <label>
                Title
                <input placeholder='Summarise your experience...' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
              </label>

              <label className='column'>
                  Comment
                  <textarea rows={5} value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Share your thoughts about this spot...' >
                  </textarea>
              </label>

              <div className='sff-author-name'>
                <div className="sff-author-initial">{user?.firstName.slice(0, 1)}</div>
                <p className='sffa-name'>Leaving feedback as <b>{user?.firstName}</b></p>
              </div>

              <input type="submit" value="Submit" className='primary' />
              {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
          :
            <>
              <p>You need to be logged in to leave a comment.</p>
              <a href="/login" className="primary">Log in</a>
            </>
        }
    </div>

  </section>
  </>
  );
}

export default Spot;