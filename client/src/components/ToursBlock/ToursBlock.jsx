import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import cl from './ToursBlock.module.css';
import { ContextMain } from '../..';
import TourItem from './TourItem/TourItem';

const ToursBlock = observer(() => {

    const { tourStore } = useContext(ContextMain);

    return (
        <div id='tours__block' className={cl.tourBlock}>
            <div className="container">
                <h2 className={cl.blockTitle}>Экскурсии</h2>
                {tourStore.tours &&
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
                    </div>
                }
            </div>
        </div>
    );
});

export default ToursBlock;