import React from 'react';
import './style.scss';

function Backgrounds({ timeOfDay }) {
    // useEffect(() => {

    // }, []);
    return (
        <div className={`bg ${timeOfDay}`}>
            {timeOfDay === 'sunrise' ? (
                <div className="day-items">
                    <div className={`sun ${timeOfDay}`} />
                </div>
            ) : timeOfDay === 'day' ? (
                <div className="day-items">
                    <div className={`sun ${timeOfDay}`} />
                </div>
            ) : timeOfDay === 'evening' ? (
                <div className="day-items">
                    <div className={`sun ${timeOfDay}`} />
                </div>
            ) : (<div className="day-items">
                <div className={`sun ${timeOfDay}`} />
            </div>)}
        </div>
    )
}

export default Backgrounds;