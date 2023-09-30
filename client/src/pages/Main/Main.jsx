import React from 'react';
import MainBlock from '../../components/MainBlock/MainBlock';
import cl from './Main.module.css';
import ToursBlock from '../../components/ToursBlock/ToursBlock';

const Main = () => {
    return (
        <main className={cl.home}>
            <MainBlock />
            <ToursBlock />
        </main>
    );
};

export default Main;