import React from 'react';
import moment from 'moment';
import './style.scss';

function Date() {
    return(
        <div id="date-section">
            <div id="date">
                <div className="date-section">
                    {moment().format("dddd")}
                </div>
                <div className="date-section">
                    {moment().format("MMM. Do")}
                </div>
            </div>
        </div>
    )
}

export default Date;