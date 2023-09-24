import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import cl from './Main.module.css';
import { ContextMain } from '../../..';
import CreateMainBlockPost from '../CreateMainBlockPost/CreateMainBlockPost';

const Main = observer(({ className }) => {

    const { mainBlockStore } = useContext(ContextMain);

    return (
        <div className={className}>
            <div className={cl.titleBlock}>Главный баннер</div>
            {mainBlockStore.slides.length === 0
                ?
                <div className={cl.notFound}>Записей не найдено</div>
                :
                <div className={cl.mainHolder}>
                    <div className={cl.mainPrevWiew}>
                        посты есть: {mainBlockStore.slides.length}
                    </div>
                </div>
            }
            <CreateMainBlockPost />
        </div>
    );
});

export default Main;