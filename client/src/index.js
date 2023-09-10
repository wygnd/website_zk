import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import NavBarStore from './store/NavBarStore';
import './styles/main.css';

export const ContextMain = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContextMain.Provider value={{
        user: new UserStore(),
        menuElements: new NavBarStore(),
    }}>
        <App />
    </ContextMain.Provider>
);
