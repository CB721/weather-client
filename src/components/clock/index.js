import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './style.scss';

function Clock({ type = 'analog' }) {
    const [displayTime, setDisplayTime] = useState({
        hours: '',
        minutes: '',
        seconds: '',
        amOrPm: ''
    });

    useEffect(() => {
        const clockTimer = setInterval(() => {
            if (type === 'analog') {
                const deg = 6;
                const hr = document.querySelector('#hr');
                const min = document.querySelector('#mn');
                const sec = document.querySelector('#sc');
                let day = new Date();
                let hh = day.getHours() * 30;
                let mm = day.getMinutes() * deg;
                let ss = day.getSeconds() * deg;
                hr.style.transform = `rotateZ(${(hh) + (mm / 12)}deg)`;
                min.style.transform = `rotateZ(${mm}deg)`;
                sec.style.transform = `rotateZ(${ss}deg)`;
            } else {
                const currentSecs = new Date() - new Date(0);
                let hours = moment(new Date(currentSecs)).format('h');
                let minutes = moment(new Date(currentSecs)).format('mm');
                let seconds = moment(new Date(currentSecs)).format('ss');
                let amOrPm = moment(new Date(currentSecs)).format('A');
                setDisplayTime({
                    hours, minutes, seconds, amOrPm
                });
            }

        }, 1000);
        return () => {
            clearInterval(clockTimer);
        }
    }, []);

    return (
        <div id="clock-section">
            <div id="clock-bg">
                <div id="clock">
                    {type === 'analog' ? (
                        <div>
                            <div className="hour">
                                <div className="hr" id="hr" />
                            </div>
                            <div className="min">
                                <div className="mn" id="mn" />
                            </div>
                            <div className="sec">
                                <div className="sc" id="sc" />
                            </div>
                        </div>
                    ) : (
                            <div className="digital">
                                {`${displayTime.hours}:${displayTime.minutes}:${displayTime.seconds} ${displayTime.amOrPm}`}
                            </div>
                        )}
                </div>
            </div>
        </div>
    )
}

export default Clock;