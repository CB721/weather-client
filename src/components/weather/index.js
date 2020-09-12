import React, { useState } from 'react';
import WeatherSection from '../weather-section';
import './style.scss';

function Weather({ today, forecast }) {
    const [isExpand, setIsExpand] = useState(false);
    function expand(event) {
        event.preventDefault();
        setIsExpand(!isExpand);
    }
    return (
        <div className={`weather ${isExpand ? "" : "condensed"}`}>
            {isExpand ? (
                <div className={`curr-weather ${window.screen.width < 500 ? 'mobile' : ''} `}>
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
            ) : (<div className={`curr-weather ${window.screen.width < 500 ? 'mobile' : ''} `}>
                <WeatherSection
                    weather={today}
                    isToday={true}
                />
            </div>)}
            <div id="expand-weather" onClick={(e) => expand(e)}>
                {isExpand ? "Hide Forecast" : "Show Forecast"}
            </div>
        </div>
    )
}

export default Weather;