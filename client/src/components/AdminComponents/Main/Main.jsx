import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import cl from './Main.module.css';
import { ContextMain } from '../../..';
import CreateMainBlockPost from './CreateMainBlockPost/CreateMainBlockPost';
import MainPostHolder from './MainPostHolder/MainPostHolder';

const Main = observer(({ className }) => {

    const { mainBlockStore } = useContext(ContextMain);

    return (
        <div className={className}>
            <div className={cl.titleBlock}>Главный баннер</div>
            {mainBlockStore.slides.length === 0
                ?
                <div className={cl.notFound}>Записей не найдено</div>
                :
                <MainPostHolder />
            }
                <CreateMainBlockPost  />
        </div>
    );
});

export default Main;