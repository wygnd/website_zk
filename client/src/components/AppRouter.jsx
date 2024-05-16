import React, { useContext } from "react";
import { authRoutes, publicRoutes } from "../routes";
import { Route, Routes, useLocation } from "react-router-dom";
import { ContextMain } from "..";
import { observer } from "mobx-react-lite";
import "../styles/main.scss";

const AppRouter = observer(() => {
  const { userStore } = useContext(ContextMain);
  const location = useLocation();

  let replacePathname = location.pathname.replace("/", "");
  if (!replacePathname) {
    replacePathname += "main";
  }

  return (
    <Routes>
      {userStore.isAuth &&
        authRoutes.map(({ path, component }) => (
          <Route key={path} path={path} element={component} />
        ))}
      {publicRoutes.map(({ path, component }) => (
        <Route key={path} path={path} element={component} />
      ))}
    </Routes>
  );
});

export default AppRouter;
