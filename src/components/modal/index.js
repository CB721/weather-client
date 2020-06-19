import React from 'react';
import './style.scss';

function Modal({ text, buttonText, action, bgStyle }) {
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