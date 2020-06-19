import React, { useState } from 'react';
import moment from 'moment';
import './style.scss';

function Weather({ weather, isToday }) {
    const [isExpand, setIsExpand] = useState(false);
    function expand(event) {
        event.preventDefault();
        setIsExpand(!isExpand);
    }
    return (
        <div className={`weather-section ${isExpand ? 'expand' : ''}`} onClick={(e) => expand(e)}>
            <header className="weat-sect-head">
                <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description}
                    className="weather-icon"
                />
                {weather.name ? (
                    <p className="city">
                        {weather.name}
                    </p>
                ) : (<div />)}
                <p className="day">
                    {moment(new Date(weather.dt * 1000)).format('ddd')}
                </p>
            </header>
            <section className="weather-details">
                <p className="weather-char">Temp: {weather.main.temp}&#176;F</p>
                {isToday ? (
                    <p className="weather-char">Feels Like: {weather.main.feels_like}&#176;F</p>
                ) : (<div />)}
                {isExpand || isToday ? (
                    <div>
                        <p className="weather-char">Description: {weather.weather[0].description}</p>
                        <p className="weather-char">Humidity: {weather.main.humidity}%</p>
                        <p className="weather-char">Wind: {weather.wind.speed}MPH</p>
                    </div>
                ) : (<div />)}
                {isToday ? (
                    <div className="max-min-temp">
                        <p className="weather-char">
                            Low Temp: {weather.main.temp_min}&#176;F
                        </p>
                        <p className="weather-char">
                            High Temp: {weather.main.temp_max}&#176;F
                        </p>
                    </div>
                ) : <div />}
                {isToday ? (
                    <div className="sunrise-sunset">
                        <p className="weather-char">
                            Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleString('en-US').split(", ")[1]}
                        </p>
                        <p className="weather-char">
                            Sunset: {new Date(weather.sys.sunset * 1000).toLocaleString('en-US').split(", ")[1]}
                        </p>
                    </div>
                ) : <div />}
            </section>
        </div>
    )
}

export default Weather;