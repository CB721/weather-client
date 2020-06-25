import React from 'react';
import CurrWeather from '../currweather';
import './style.scss';

function Backgrounds({ timeOfDay, weather, showCurrWeather }) {
    return (
        <div className={`bg ${timeOfDay}`}>
            {timeOfDay === 'sunrise' || timeOfDay === 'day' ? (
                <div className="day-items">
                    <div className={`sun ${timeOfDay} `} />
                    {showCurrWeather ? (
                        <CurrWeather
                            weather={weather}
                            timeOfDay={timeOfDay}
                        />
                    ) : (<div />)}
                </div>
            ) : timeOfDay === 'evening' ? (
                <div className="day-items">
                    <div className={`sun ${timeOfDay}`} />
                    {showCurrWeather ? (
                        <div>
                            {[...Array(100)].map((star, index) => (
                                <div key={index} className="stars" />
                            ))}
                            <CurrWeather
                                weather={weather}
                                timeOfDay={timeOfDay}
                            />
                        </div>
                    ) : (<div />)}
                </div>
            ) : (<div className="day-items">
                <div className={`sun ${timeOfDay}`} />
                {showCurrWeather ? (
                    <div>
                        {[...Array(150)].map((star, index) => (
                            <div key={index} className="stars night" />
                        ))}
                        <CurrWeather
                            weather={weather}
                            timeOfDay={timeOfDay}
                        />
                    </div>
                ) : (<div />)}
            </div>)}
        </div>
    )
}

export default Backgrounds;