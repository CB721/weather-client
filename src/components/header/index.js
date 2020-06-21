import React from 'react';
import './style.scss';

function Header(props) {
    return (
        <div className="welcome-header">
            Welcome {props.name}!
        </div>
    )
}

export default Header;