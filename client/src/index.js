import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import NavBarStore from './store/NavBarStore';
import './styles/main.css';
import GalleryStore from './store/galleryStore';
import BasicStore from './store/basicStore';

const userStore = new UserStore();
const basicStore = new BasicStore()

export const ContextMain = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContextMain.Provider value={{
        userStore,
        menuElements: new NavBarStore(),
        galleryStore: new GalleryStore(),
        basicStore,
    }}>
        <App />
    </ContextMain.Provider>
);
