import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './style.scss';

function Modal(props) {
    const [bgStyle, setBgStyle] = useState("");
    const currentHour = parseInt(moment().format("H"));

    useEffect(() => {
        if (currentHour >= 5 && currentHour < 10) {
            setBgStyle("sunrise");
        }
        if (currentHour >= 10 && currentHour < 17) {
            setBgStyle("day");
        }
        if (currentHour >= 17 && currentHour < 21) {
            setBgStyle("evening");
        }
        if ((currentHour >= 21 && currentHour < 25) || (currentHour >= 0 && currentHour < 5)) {
            setBgStyle("night");
        }
    }, [currentHour]);

    return (
        <div className={`modal ${bgStyle}`}>
            <div className="content">
                <div className="text">
                    {props.text}
                </div>
                <button onClick={props.action}>
                    {props.buttonText}
                </button>
            </div>
        </div>
    )
}

export default Modal;