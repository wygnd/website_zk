import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { ContextMain } from '../../..';
import TourItems from './TourItems/TourItems';
import cl from './Tour.module.css';
import CreateTour from './CreateTour/CreateTour';
import LastItem from './LastItem/LastItem';

const Tour = observer(({ className }) => {

    const { tourStore } = useContext(ContextMain);

    return (
        <div className={className}>
            <h2 className={cl.titleBlock}>Блок: Экскурсии</h2>
            {tourStore.tours.length === 0
                ?
                <h4 className={cl.notFound}>Записей на нейдено</h4>
                :
                <>
                    <TourItems />
                </>
            }
            <CreateTour />
            <LastItem />
        </div>
    );
});

export default Tour;