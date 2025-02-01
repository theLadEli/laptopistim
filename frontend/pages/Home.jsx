import { useEffect, useState } from 'react';
import { getSpots } from '../utils/api';

function Home(){
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    getSpots().then(setSpots);
  }, []);

  return (
    <div>
      <h1>Welcome to Laptopistim</h1>
      <ul>
        {spots.map(spot => (
          <li key={spot.id}>{spot.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;