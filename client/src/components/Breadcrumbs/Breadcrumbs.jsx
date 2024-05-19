import React, { useContext } from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { authRoutes, publicRoutes } from "../../routes";
import { NavLink } from "react-router-dom";
import cl from "./Breadcrumbs.module.scss";
import { MAIN_ROUTE } from "../../utils/consts";
import { observer } from "mobx-react-lite";
import { ContextMain } from "../..";

const Breadcrumbs = observer(() => {
  const { basicStore, userStore } = useContext(ContextMain);
  const breadcrumbsPublic = useBreadcrumbs(publicRoutes);
  const breadcrumbsAuth = useBreadcrumbs(authRoutes);

  return (
    <div className={cl.breadcrumb}>
      <NavLink to={MAIN_ROUTE} className={cl.item}>
        {basicStore?.siteTitle}
      </NavLink>
      {userStore?.isAuth
        ? breadcrumbsPublic.map(({ match, breadcrumb }) => (
            <NavLink
              to={match.pathname}
              key={match.pathname}
              className={cl.currentItem}
            >
              <span> / </span>
              {breadcrumb}
            </NavLink>
          ))
        : breadcrumbsAuth.map(({ match, breadcrumb }) => (
            <NavLink
              to={match.pathname}
              key={match.pathname}
              className={cl.currentItem}
            >
              <span> / </span>
              {breadcrumb}
            </NavLink>
          ))}
    </div>
  );
});

export default Breadcrumbs;
