import React from 'react';
import MainBlock from '../../components/MainBlock/MainBlock';
import cl from './Main.module.css';
import ToursBlock from '../../components/ToursBlock/ToursBlock';
import { observer } from 'mobx-react-lite';
import CollectionsBlock from '../../components/CollectionsBlock/CollectionsBlock';

const Main = observer(() => {
    return (
        <main className={cl.home}>
            <MainBlock />
            <ToursBlock />
            <CollectionsBlock />
        </main>
    );
});

export default Main;