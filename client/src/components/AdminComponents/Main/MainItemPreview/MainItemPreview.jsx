import React from 'react';
import cl from './MainItemPreview.module.scss';

const MainItemPreview = ({ title }) => {

    return (
        <div className={cl.itemPreview}>
            <div className={cl.titleItem}>{title}</div>
        </div>
    );
};

export default MainItemPreview;