import { useState, useEffect } from 'react';

function Spot() {
  const [spot, setSpot] = useState(null);

  // Get the spot ID from the URL (URL structure: /spot/:id)
  const spotId = window.location.pathname.split('/')[2];

  useEffect(() => {
    fetch(`http://localhost:5200/spots/${spotId}`)
      .then(res => res.json())
      .then(data => setSpot(data))
      .catch(err => console.error('Error fetching spot details:', err));
  }, [spotId]);

  if (!spot) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{spot.name}</h1>
      <p>{spot.address}</p>
      <p>{spot.description}</p>
      <img src={spot.image} alt={spot.name} />
      <p>Recommended: {spot.recommended ? 'Yes' : 'No'}</p>
    </div>
  );
}

export default Spot;
