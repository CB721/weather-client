import React, { useState } from 'react';
import moment from 'moment';
import './style.scss';

function Clock() {
    const [displayTime, setDisplayTime] = useState({
        hours: '',
        minutes: '',
        seconds: '',
        amOrPm: ''
    });

    setInterval(() => {
        const currentSecs = new Date() - new Date(0);
        let hours = moment(new Date(currentSecs)).format('h');
        let minutes = moment(new Date(currentSecs)).format('mm');
        let seconds = moment(new Date(currentSecs)).format('ss');
        let amOrPm = moment(new Date(currentSecs)).format('A');
        setDisplayTime({
            hours, minutes, seconds, amOrPm
        });
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
    }, 1000);



    return (
        <div id="clock-section">
            <div id="clock-bg">
                <div id="clock">
                    <div className="hour">
                        <div className="hr" id="hr" />
                    </div>
                    <div className="min">
                        <div className="mn" id="mn" />
                    </div>
                    <div className="sec">
                        <div className="sc" id="sc" />
                    </div>
                    <div className="digital">
                        {`${displayTime.hours}:${displayTime.minutes}:${displayTime.seconds} ${displayTime.amOrPm}`}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Clock;