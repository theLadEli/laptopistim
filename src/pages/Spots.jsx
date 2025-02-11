import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate, useLocation } from 'react-router-dom';

import Cities from '../components/Cities';

// Icons
import StatusCircle from '../assets/icons/status-circle.svg';
import MapPin from '../assets/icons/map-pin.svg'
import PowerSockets from '../assets/icons/power-sockets.svg'
import Crowdedness from '../assets/icons/crowdedness.svg'
import Clock from '../assets/icons/clock.svg'
import WiFi from '../assets/icons/WiFi.svg'

export default function Spots() {
    const location = useLocation(); // Get current URL
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    
    const [spots, setSpots] = useState([]);

    const [sortby, setSortby] = useState(queryParams.get('sortby') || 'default');
    const [powerSockets, setPowerSockets] = useState(queryParams.get("powerSockets") === "true");
    const [openLate, setOpenLate] = useState(queryParams.get("openLate") === "true");
    const [wifi, setWifi] = useState(queryParams.get("wifi") === "true");
    const [wifiCommunityRated, setWifiFilterRating] = useState(queryParams.get("wifiCommunityRated") || 0);

    // Function to update URL without fetching
    const updateUrl = (updatedParams) => {
        const params = new URLSearchParams(location.search);

        Object.entries(updatedParams).forEach(([key, value]) => {
            if (value) {
                params.set(key, value.toString());
            } else {
                params.delete(key);
            }
        });

        navigate(`?${params.toString()}`, { replace: true });
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        fetch(`https://laptopistim.onrender.com/spots/all?${params.toString()}`)
        .then(res => res.json())  // Parse response to JSON
        .then(data => setSpots(data))  // Update the 'spots' state with fetched data
        .catch(err => console.error('Error fetching spots:', err));
    }, [location.search]);

    // Handlers for filters
    const handleWifiChange = () => {
        setWifi(prev => {
            const newValue = !prev;
            updateUrl({ wifi: newValue });
            return newValue;
        });
    };

    const handleOpenLateChange = () => {
        setOpenLate(prev => {
            const newValue = !prev;
            updateUrl({ openLate: newValue });
            return newValue;
        });
    };

    const handleSortChange = (e) => {
        const newSort = e.target.value;
        setSortby(newSort);
        updateUrl({ sortby: newSort });
    };

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
                    <div className="asf-section">
                        <h3>Must Include</h3>
                        <label>
                            <input type="checkbox" name="req-power-sockets" />
                            Power Sockets
                        </label>
                        <label>
                            <input checked={openLate} onChange={handleOpenLateChange} type="checkbox" name="req-open-late" />
                            Open Late
                        </label>
                    </div>
                    <div className="asf-section">
                        <h3>WiFi</h3>
                        <label>
                            <input checked={wifi} onChange={handleWifiChange} type="checkbox" name="req-wifi" />
                            Must offer WiFi
                        </label>
                        <label>
                            <input type="checkbox" name="req-wifi-community-rated" onClick={
                                (e) => {
                                    const radios = document.getElementsByName('req-wifi-filter-radio');
                                    radios.forEach(radio => radio.disabled = !e.target.checked);
                                }
                            } />
                            Community rated...
                        </label>
                        <div className="rating-circle-row">
                            <input disabled type="radio" name="req-wifi-filter-radio" value='1' onChange={(e) => setWifiFilterRating(e.target.value)} />
                            <input disabled type="radio" name="req-wifi-filter-radio" value='1' onChange={(e) => setWifiFilterRating(e.target.value)} />
                            <input disabled type="radio" name="req-wifi-filter-radio" value='1' onChange={(e) => setWifiFilterRating(e.target.value)} />
                            <input disabled type="radio" name="req-wifi-filter-radio" value='1' onChange={(e) => setWifiFilterRating(e.target.value)} />
                            <input disabled type="radio" name="req-wifi-filter-radio" value='1' onChange={(e) => setWifiFilterRating(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div id="as-list" className="column">

                    <div className="as-filter-stats">
                        <p className="sd-subheading row">
                            <img src={StatusCircle} />
                            {spots.length} spots
                        </p>

                        <select onChange={handleSortChange} value={sortby} name="sort_by" id="sd-sort_by">
                            <option value="default">Sort by: default</option>
                            <option value="newest-oldest">Sort by: latest to oldest</option>
                            <option value="oldest-newest">Sort by: oldest to newest</option>
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
                                                {spot.address}
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