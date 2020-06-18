import React, { useEffect, useState } from 'react';
import './style.scss';

function Modal({ text, buttonText, action, currentHour }) {
    const [bgStyle, setBgStyle] = useState("");

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
                    {text}
                </div>
                <button onClick={action}>
                    {buttonText}
                </button>
            </div>
        </div>
    )
}

export default Modal;