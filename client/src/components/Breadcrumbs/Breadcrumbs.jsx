import React from 'react';
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { publicRoutes } from '../../routes';
import { NavLink } from 'react-router-dom';
import cl from './Breadcrumbs.module.css';
import { MAIN_ROUTE } from '../../utils/consts';

const Breadcrumbs = () => {

    const breadcrumbs = useBreadcrumbs(publicRoutes);

    return (
        <div className={cl.breadcrumb}>
            <span>
                <NavLink to={MAIN_ROUTE}>{}</NavLink>
            </span>
            {breadcrumbs.map(({ match, breadcrumb }) => (
                console.log(match)
                // <span key={match.pathname}>
                //     <NavLink to={match.pathname}>{breadcrumb}</NavLink>
                // </span>
            ))}
        </div>
    );
};

export default Breadcrumbs;