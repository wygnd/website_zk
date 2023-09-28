import React, { useEffect, useState } from 'react';
import cl from './MainItemPreview.module.css';
import { getImageById } from '../../../http/galleryAPI';
import { SERVER_URL } from '../../../utils/consts';
import Fancybox from '../../Fancybox';

const MainItemPreview = ({ title, desc, galleryId }) => {

    const [fileName, setFileName] = useState('');
    const fetchData = async (id) => {
        return getImageById(id);
    }

    useEffect(() => {
        fetchData(galleryId).then(data => setFileName(data.fileName));
    }, []);

    return (
        <div className={cl.itemPreview}>
            <div className={cl.titleItem}>{title}</div>
            {/* <div className={cl.descItem}>{desc}</div>
            <Fancybox>
                <a href={`${SERVER_URL}/${fileName}`} className={cl.imageItem}>
                    <img
                        src={`${SERVER_URL}/${fileName}`}
                        data-src={`${SERVER_URL}/${fileName}`}
                        data-fancybox={`galleryImage-${galleryId}`}
                        alt="" />
                </a>
            </Fancybox> */}
        </div>
    );
};

export default MainItemPreview;