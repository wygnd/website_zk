import React from 'react';
import cl from './MainItemPreview.module.css';

const MainItemPreview = ({ title, desc, buttonVisible, textButton, linkButton, galleryId }) => {
    return (
        <div className={cl.itemPreview}>
            <div className={cl.titleItem}>{title}</div>
            <div className={cl.descItem}>{desc}</div>
            <div className={cl.descItem}>{desc}</div>
            {buttonVisible &&
                <a href={linkButton}>{textButton}</a>
            }
            <div className={cl.imageItem}>
                
            </div>
        </div>
    );
};

export default MainItemPreview;