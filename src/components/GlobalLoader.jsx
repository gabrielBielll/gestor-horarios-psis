import React from 'react';

const GlobalLoader = ({ message }) => (
    <div className="global-loader-overlay">
        <div className="spinner"></div>
        {message && <div className="global-loader-text">{message}</div>}
    </div>
);

export default GlobalLoader;