import React, { useContext } from 'react';
import { authRoutes, publicRoutes } from '../routes';
import { Route, Routes } from 'react-router-dom';
import { ContextMain } from '..';

const AppRouter = () => {

    const { user } = useContext(ContextMain);

    return (
        <Routes>
            {user.isAuth && authRoutes.map(({ path, component }) =>
                <Route key={path} path={path} element={component} />
            )}
            {publicRoutes.map(({ path, component }) =>
                <Route key={path} path={path} element={component} />
            )}
        </Routes>
    );
};

export default AppRouter;