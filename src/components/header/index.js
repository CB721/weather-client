import React from 'react';
import './style.scss';

function Header(props) {
    return (
        <header className="welcome-header">
            <div id="left-header">

            </div>
            <div id="center-header">
                Welcome {props.name}!
            </div>
            <div id="right-header">
                <div className="menu" onClick={event => props.openMenu(event)}>
                    <div className="bar" />
                    <div className="bar" />
                    <div className="bar" />
                </div>
            </div>
        </header>
    )
}

export default Header;