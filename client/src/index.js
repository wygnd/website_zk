import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import NavBarStore from './store/NavBarStore';
import './styles/main.css';
import GalleryStore from './store/galleryStore';
import BasicStore from './store/basicStore';
import MainBlockStore from './store/mainBlockStore';
import TourStore from './store/TourStore';
import CollectionsStore from './store/collectionsStore';


export const ContextMain = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContextMain.Provider value={{
        userStore: new UserStore(),
        menuElements: new NavBarStore(),
        galleryStore: new GalleryStore(),
        basicStore: new BasicStore(),
        mainBlockStore: new MainBlockStore(),
        tourStore: new TourStore(),
        collections: new CollectionsStore()
    }}>
        <App />
    </ContextMain.Provider>
);
