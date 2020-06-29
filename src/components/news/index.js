import React from 'react';
import moment from 'moment';
import './style.scss';

export function NewsBar({ children, changeNewsPage }) {
    return (
        <div id="news-bar">
            <div id="news-area">
                {children}
            </div>
            <div id="news-direction">
                <div
                    className="symbol"
                    onClick={event => changeNewsPage(event, false)}
                >
                    {"<"}
                </div>
                <div
                    className="symbol"
                    onClick={event => changeNewsPage(event, true)}
                >
                    {">"}
                </div>
            </div>
        </div>
    );
}

export function NewsSection({ data }) {
    function openLink(event) {
        event.preventDefault();
        window.open(data.url);
    }
    return (
        <div
            className="news-section"
            onClick={event => openLink(event)}
        >
            <div className="news-header">
                {data.title}
            </div>
            <div className="news-image-section">
                <img src={data.urlToImage} alt={data.title} className="news-image" />
            </div>
            <div className="news-date-source-section">
                <div className="news-date">
                    {moment(data.publishedAt).format('MMM D, YYYY')}
                </div>
                <span className="news-source">
                    {data.source.name}
                </span>
            </div>
        </div>
    );
}
