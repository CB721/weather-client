import React from 'react';
import './style.scss';

function Modal({ text, buttonText, action, bgStyle, children }) {
    return (
        <div className={`modal ${bgStyle}`}>
            <div className="content">
                <div className="modal-text">
                    {text}
                </div>
                {children ? (
                    <div className="modal-children">
                        {children}
                    </div>
                ) : <div />}
                <button
                    onClick={action}
                    className="modal-button"
                >
                    {buttonText}
                </button>
            </div>
        </div>
    )
}

export default Modal;