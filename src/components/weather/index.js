import React from 'react';
import WeatherSection from '../weather-section';
import './style.scss';

function Weather({ today, forecast }) {
    return (
        <div className={`curr-weather ${window.screen.width < 500 ? 'mobile' : ''}`}>
            <WeatherSection
                weather={today}
                isToday={true}
            />
            {forecast.map(day => (
                <WeatherSection
                    key={day.dt}
                    weather={day}
                />
            ))}
        </div>
    )
}

export default Weather;