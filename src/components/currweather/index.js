import React, { useEffect, useState } from 'react';
import { ReactComponent as DarkCloud } from "./images/dark-cloud.svg";
import { ReactComponent as LightCloud } from "./images/light-cloud.svg";
import './style.scss';

function CurrWeather({ timeOfDay, weather }) {
    const [lightClouds, setLightClouds] = useState(false);
    const [darkClouds, setDarkClouds] = useState(false);
    const [rain, setRain] = useState(false);
    const [mist, setMist] = useState(false);
    const [snow, setSnow] = useState(false);
    const [stars, setStars] = useState(false);
    const [cloudCount, setCloudCount] = useState(0);

    useEffect(() => {
        if (timeOfDay === "night") {
            setStars(true);
        }
        const lowerWeatherDesc = weather.weather[0].description.toLowerCase();
        if (lowerWeatherDesc.includes('snow')) {
            setSnow(true);
        }
        if (lowerWeatherDesc.includes('mist')) {
            setMist(true);
        }
        if (lowerWeatherDesc.includes('clouds') && (timeOfDay === "night" || timeOfDay === "sunset")) {
            setDarkClouds(true);
        }
        if (lowerWeatherDesc.includes('clouds') && (timeOfDay === "day" || timeOfDay === "sunrise")) {
            setLightClouds(true);
        }
        if (lowerWeatherDesc.includes('rain') || lowerWeatherDesc.includes('drizzle') || lowerWeatherDesc.includes('thunderstorm')) {
            setRain(true);
            setDarkClouds(true);
            setLightClouds(false);
        }
        setCloudCount(Math.ceilweather.clouds.all / 10);
    }, [weather, timeOfDay]);
    return (<div>
        {darkClouds ? (
            <div>
                {[...Array(cloudCount)].map((cloud, index) => (
                    <DarkCloud key={index} className="clouds" />
                ))}
            </div>
        ) : lightClouds ? (
            <div>
                {[...Array(cloudCount)].map((cloud, index) => (
                    <LightCloud key={index} className="clouds" />
                ))}
            </div>
        ) : (<div />)}
        {rain ? (<div>
            {[...Array(150)].map((rain, index) => (
                <div key={index} className="rain" />
            ))}
        </div>) : (<div />)}
        {snow ? (<div>
            {[...Array(100)].map((snow, index) => (
                <div key={index} className="snow">❆</div>
            ))}
            {[...Array(100)].map((snow, index) => (
                <div key={index} className="snow">❅</div>
            ))}
        </div>) : (<div />)}
    </div>);
}

export default CurrWeather;