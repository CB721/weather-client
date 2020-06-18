import React from 'react';
import './style.scss';

function Weather({ weather }) {
    return (
        <div className="weather-section">
            <header>
                <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description}
                />
                <p>
                    
                </p>
            </header>
        </div>
    )
}

export default Weather;