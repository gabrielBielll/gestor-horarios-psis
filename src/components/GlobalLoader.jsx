import React from 'react';

const GlobalLoader = ({ message }) => (
    <div className="global-loader-overlay">
        <div className="spinner"></div>
        <p className="global-loader-text">{message || 'Salvando...'}</p>
    </div>
);

export default GlobalLoader;
