import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Cities from '../components/Cities';

// Icons
import StatusCircle from '../assets/icons/status-circle.svg';
import MapPin from '../assets/icons/map-pin.svg'
import PowerSockets from '../assets/icons/power-sockets.svg'
import Crowdedness from '../assets/icons/crowdedness.svg'
import Clock from '../assets/icons/clock.svg'
import WiFi from '../assets/icons/WiFi.svg'

export default function Spots() {
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5200/spots/all')
        .then(res => res.json())  // Parse response to JSON
        .then(data => setSpots(data))  // Update the 'spots' state with fetched data
        .catch(err => console.error('Error fetching spots:', err));  // Handle errors
    }, []);

    return (
    <>
        <div className="header-container container">
            <header id='spots-header' className='column'>

                <div className="column title">
                <h1>All Spots</h1>

                    <div className="row subtitle">
                        <hr/>
                        <h5>the best Israel has to offer</h5>
                    </div>
                </div>
            </header>
        </div>

        <div className="container">
            <section className='column spots-cities' id="cities">
                <Cities />   
            </section>
        </div>

        <div className="container">
            <section id="all-spots" className='row'>

                <div id="as-filter" className="column">

                </div>

                <div id="as-list" className="column">

                    <div className="as-filter-stats">
                        <p className="sd-subheading row">
                            <img src={StatusCircle} />
                            {spots.length} spots
                        </p>

                        <select name="sort_by" id="sd-sort_by">
                            <option value="default">Sort by: default</option>
                            <option value="default">Sort by: latest to oldest</option>
                            <option value="default">Sort by: oldest to newest</option>
                        </select>
                    </div>
                    

                    {spots.map(spot => {
                        return (
                            <a href={`/spots/${spot.id}`} key={spot.id}>
                                <div className="as-spot-card">
                                    <img className='assc-cover-img' src={spot.image} alt={`${spot.name} image`} />

                                    <div className='assc-content column'>
                                        <div className="asscc-name-address column">
                                            <h3>{spot.name}</h3>
                                            <div className="lsci-address">
                                                <img src={MapPin} />
                                                <a href={`https://www.google.com/maps/search/${spot.address}`}>
                                                    {spot.address}
                                                </a>
                                            </div>
                                        </div>

                
                                        <ul className="row assc-features">
                
                                            {spot.avg_power_sockets_rating >= 3 && (
                                                <li >
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
                                </div>
                            </a>
                        )
                    })}

                </div>

            </section>
        </div>
    </>
    )
}