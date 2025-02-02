import { useEffect, useState } from 'react';

// Images
import MapPin from '../assets/icons/map-pin.svg'
import TelAviv from '../assets/images/cities/tel-aviv.png'
import Jerusalem from '../assets/images/cities/jerusalem.png'
import Haifa from '../assets/images/cities/haifa.png'
import RamatGan from '../assets/images/cities/ramat-gan.png'

export default function Cities() {

    const [cities, setCities] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5200/cities')
            .then(res => res.json())
            .then(data => setCities(data))
            .catch(err => console.error('Error fetching cities:', err));
    }, []);

    function countCitySpots(cityName) {
        // Find the city object where the name matches cityName (ignoring case)
        const foundCity = cities.find(city => city.name.toLowerCase() === cityName.toLowerCase());

        // If the city is found, return its spots_count, otherwise return null
        return foundCity ? foundCity.spots_count : 'pending';
    }

    return (
        <div className="city-row row">

            <div className="city-card row">
                <img className='city-img' src={TelAviv} alt='Tel Aviv image' />
                <div className="city-info column">
                <h3 className='cc-city-name'>Tel Aviv</h3>
                <div className="city-stats row">
                    <img src={MapPin} />
                    {countCitySpots('tel aviv')} spots
                </div>
                </div>
            </div>

            <div className="city-card row">
                <img className='city-img' src={Jerusalem} alt='jerusalem image' />
                <div className="city-info column">
                <h3 className='cc-city-name'>Jerusalem</h3>
                <div className="city-stats row">
                    <img src={MapPin} />
                    {countCitySpots('jerusalem')} spots
                </div>
                </div>
            </div>

            <div className="city-card row">
                <img className='city-img' src={RamatGan} alt='ramat gan image' />
                <div className="city-info column">
                <h3 className='cc-city-name'>Ramat Gan</h3>
                <div className="city-stats row">
                    <img src={MapPin} />
                    {countCitySpots('ramat gan')} spots
                </div>
                </div>
            </div>

            <div className="city-card row">
                <img className='city-img' src={Haifa} alt='haifa image' />
                <div className="city-info column">
                <h3 className='cc-city-name'>Haifa</h3>
                <div className="city-stats row">
                    <img src={MapPin} />
                    {countCitySpots('haifa')} spots
                </div>
                </div>
            </div>

        </div>
    )
}