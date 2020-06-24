import React from 'react';
import './style.scss';

export function Form({ children }) {
    return (
        <form className="form">{children}</form>
    );
}

export function Input({type, value, name, placeholder, handleInputChange, validate, autoFocus, aria}) {
    return (
        <input
            className="input"
            type={type}
            value={value}
            name={name}
            placeholder={placeholder}
            onChange={handleInputChange}
            onBlur={validate}
            aria-labelledby={aria || name}
            autoFocus={autoFocus}
        />
    );
}