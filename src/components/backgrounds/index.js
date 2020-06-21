import React from 'react';
import CurrWeather from '../currweather';
import './style.scss';

function Backgrounds({ timeOfDay, weather }) {
    console.log(weather);
    return (
        <div className={`bg ${timeOfDay}`}>
            {timeOfDay === 'sunrise' ? (
                <div className="day-items">
                    <div className={`sun ${timeOfDay} `} />
                    <CurrWeather
                    weather={weather}
                    timeOfDay={timeOfDay}
                />
                </div>
            ) : timeOfDay === 'day' ? (
                <div className="day-items">
                    <div className={`sun ${timeOfDay}`} />
                    <CurrWeather
                    weather={weather}
                    timeOfDay={timeOfDay}
                />
                </div>
            ) : timeOfDay === 'evening' ? (
                <div className="day-items">
                    <div className={`sun ${timeOfDay}`} />
                    <CurrWeather
                    weather={weather}
                    timeOfDay={timeOfDay}
                />
                </div>
            ) : (<div className="day-items">
                <div className={`sun ${timeOfDay}`} />
                <CurrWeather
                    weather={weather}
                    timeOfDay={timeOfDay}
                />
            </div>)}
        </div>
    )
}

export default Backgrounds;