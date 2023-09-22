import React from 'react';
import MainBlock from '../../components/MainBlock/MainBlock';
import cl from './Main.module.css';

const Main = () => {
    return (
        <main className={cl.home}>
            <MainBlock />
        </main>
    );
};

export default Main;