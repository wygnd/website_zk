import React, { useContext } from 'react';
import { authRoutes, publicRoutes } from '../routes';
import { Route, Routes } from 'react-router-dom';
import { ContextMain } from '..';
import { observer } from 'mobx-react-lite';
import '../styles/main.css';

const AppRouter = observer(() => {

    const { userStore } = useContext(ContextMain);

    return (
        <main>
            <Routes>
                {userStore.isAuth && authRoutes.map(({ path, component }) =>
                    <Route key={path} path={path} element={component} />
                )}
                {publicRoutes.map(({ path, component }) =>
                    <Route key={path} path={path} element={component} />
                )}
            </Routes>
        </main>
    );
});

export default AppRouter;