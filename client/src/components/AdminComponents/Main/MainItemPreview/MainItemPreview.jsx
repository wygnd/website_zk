import React, { useEffect, useState } from 'react';
import cl from './MainItemPreview.module.css';

const MainItemPreview = ({ title }) => {

    return (
        <div className={cl.itemPreview}>
            <div className={cl.titleItem}>{title}</div>
        </div>
    );
};

export default MainItemPreview;