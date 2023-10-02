import React from 'react';
import cl from './TourItem.module.css';

const TourItem = ({ name, textButton, linkButton, galleryId, className }) => {
    return (
        <div className={className}>
            <div className={cl.name}>{name}</div>
        </div>
    );
};

export default TourItem;