import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import NavBarStore from './store/NavBarStore';
import './styles/main.css';

const userStore = new UserStore();
export const ContextMain = createContext({
    userStore,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContextMain.Provider value={{
        userStore,
        menuElements: new NavBarStore(),
    }}>
        <App />
    </ContextMain.Provider>
);
