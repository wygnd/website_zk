import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import cl from './ToursBlock.module.css';
import { ContextMain } from '../..';
import TourItem from './TourItem/TourItem';
import { getImageById } from '../../http/galleryAPI';
import { SERVER_URL } from '../../utils/consts';

const ToursBlock = observer(() => {

    const { tourStore } = useContext(ContextMain);
    const [fileName, setFileName] = useState('');

    useEffect(() => {
        if(!tourStore?.lastItem?.imageId) return;
        getImageById(tourStore?.lastItem?.imageId)
            .then(res => {
                setFileName(res.size)
            });
    }, [tourStore?.lastItem?.imageId])

    return (
        <div id='tours__block' className={cl.tourBlock}>
            <div className="container">
                {tourStore.tours &&
                <>
                <h2 className={cl.blockTitle}>Экскурсии</h2>
                    <div className={cl.toursHolder}>
                        {tourStore.tours.map(t =>
                            <TourItem
                                key={t.id}
                                name={t.name}
                                textButton={t.textButton}
                                linkButton={t.linkButton}
                                galleryId={t.galleryId}
                            />
                        )}
                        {tourStore.lastItemVisible &&
                            <a href={tourStore.lastItem.link} className={cl.lastItem} target='_blank'>
                                <div className={cl.lastItemName}>{tourStore?.lastItem?.name}</div>
                                {fileName &&
                                    <div className={cl.lastItemImage}>
                                        <img src={`${SERVER_URL}/${fileName.full}`} alt={fileName.fileName} />
                                    </div>
                                }
                            </a>
                        }
                    </div>
                </>
                }
            </div>
        </div>
    );
});

export default ToursBlock;