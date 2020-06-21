import React, {useState} from 'react';
import moment from 'moment';
import './style.scss';

function Clock() {
    const [displayTime, setDisplayTime] = useState("");

    setInterval(() => {
        const currentSecs = new Date() - new Date(0);
        let hours = moment(new Date(currentSecs)).format('h');
        let minutes = moment(new Date(currentSecs)).format('mm');
        let seconds = moment(new Date(currentSecs)).format('ss');
        let amOrPm = moment(new Date(currentSecs)).format('A');
        setDisplayTime(`${hours}:${minutes}:${seconds} ${amOrPm}`);
    }, 1000);

    return (
        <div className="clock-section">
            <div className="clock">
                {displayTime}
            </div>
        </div>
    )
}

export default Clock;