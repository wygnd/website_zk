import React, { useEffect, useState } from 'react';
import { getImageById } from '../../../http/galleryAPI';
import { SERVER_URL } from '../../../utils/consts';
import cl from './TourItem.module.css';

const TourItem = ({ name, textButton, linkButton, galleryId }) => {

    const [fileName, setFileName] = useState('');

    useEffect(() => {
        getImageById(galleryId)
            .then(data => {
                setFileName(data.size);
            })
    }, [])

    return (
        <div className={cl.tourItem}>
            {fileName &&
                <div className={cl.image}>
                    <img src={`${SERVER_URL}/${fileName.medium}`} />
                </div>
            }
            <div className={cl.bodyItem}>
                <div className={cl.topSide}>
                    <div className={cl.nameItem}>{name}</div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M7 7L17 17M17 17V9M17 17H9" stroke="#0A1C27" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <a href={linkButton} className={cl.linkButton} target='_blank'>{textButton}</a>
            </div>
        </div>
    );
};

export default TourItem;