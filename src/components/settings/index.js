import React from 'react';
import './style.scss';

function Settings({ settings, closeMenu, adjustSetting }) {
    console.log(Object.keys(settings), settings);
    function convertKey(key) {
        switch (key) {
            case "showDate":
                return "Date";
            case "showClock":
                return "Clock";
            case "showWeatherBG":
                return "Weather Background";
            case "showWeather":
                return "Weather Forecast";
            case "showNews":
                return "News";
            case "clockType":
                return "Clock Type";
            default:
                return;
        }
    }
    return (
        <div className="settings">
            <div
                id="no-content-area"
                onClick={event => closeMenu(event)}
            />
            <div id="content-area">
                {Object.keys(settings).map((key, index) => (
                    <div className="setting" key={index}>
                        <div className="setting-section">
                            {convertKey(key)}
                        </div>
                        {key !== 'clockType' ? (
                            <div
                                className="setting-section"
                                onClick={event => adjustSetting(event, key)}
                            >
                                {settings[key] ? "Show" : "Hide"}
                            </div>
                        ) : (
                                <div
                                    className="setting-section"
                                    onClick={event => adjustSetting(event, key)}
                                >
                                    {settings[key]}
                                </div>
                            )}

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Settings;