import React from 'react';
import MainBlock from '../../components/MainBlock/MainBlock';
import cl from './Main.module.css';
import ToursBlock from '../../components/ToursBlock/ToursBlock';
import { observer } from 'mobx-react-lite';

const Main = observer(() => {
    return (
        <main className={cl.home}>
            <MainBlock />
            <ToursBlock />
        </main>
    );
});

export default Main;