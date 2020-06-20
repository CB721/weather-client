import React, { useEffect, useState } from 'react';
import { ReactComponent as DarkCloud } from "./images/dark-cloud.svg";
import { ReactComponent as LightCloud } from "./images/light-cloud.svg";
import './style.scss';

function CurrWeather({ timeOfDay, weatherDesc }) {
    const [lightClouds, setLightClouds] = useState(false);
    const [darkClouds, setDarkClouds] = useState(false);
    const [rain, setRain] = useState(false);
    const [mist, setMist] = useState(false);
    const [snow, setSnow] = useState(false);
    const [stars, setStars] = useState(false);
    useEffect(() => {
        if (timeOfDay === "night") {
            setStars(true);
        }
        const lowerWeatherDesc = weatherDesc.toLowerCase();
        if (lowerWeatherDesc.includes('rain') || lowerWeatherDesc.includes('drizzle') || lowerWeatherDesc.includes('thunderstorm')) {
            setRain(true);
        }
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
    }, [weatherDesc, timeOfDay]);
    return (<div>
        {darkClouds ? (
            <div>
                <DarkCloud className="clouds" />
                <DarkCloud className="clouds" />
                <DarkCloud className="clouds" />
                <DarkCloud className="clouds" />
                <DarkCloud className="clouds" />
                <DarkCloud className="clouds" />
                <DarkCloud className="clouds" />
                <DarkCloud className="clouds" />
                <DarkCloud className="clouds" />
                <DarkCloud className="clouds" />
                <DarkCloud className="clouds" />
            </div>
        ) : lightClouds ? (
            <div>
                <LightCloud className="clouds" />
                <LightCloud className="clouds" />
                <LightCloud className="clouds" />
                <LightCloud className="clouds" />
                <LightCloud className="clouds" />
                <LightCloud className="clouds" />
                <LightCloud className="clouds" />
                <LightCloud className="clouds" />
                <LightCloud className="clouds" />
                <LightCloud className="clouds" />
            </div>
        ) : (<div />)}

    </div>);
}

export default CurrWeather;