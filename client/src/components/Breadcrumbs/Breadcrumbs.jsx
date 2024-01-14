import React, { useContext } from 'react';
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { publicRoutes } from '../../routes';
import { NavLink } from 'react-router-dom';
import cl from './Breadcrumbs.module.scss';
import { MAIN_ROUTE } from '../../utils/consts';
import { observer } from 'mobx-react-lite';
import { ContextMain } from '../..';

const Breadcrumbs = observer(() => {

    const { basicStore } = useContext(ContextMain);
    const breadcrumbs = useBreadcrumbs(publicRoutes);

    return (
        <div className={cl.breadcrumb}>
            <NavLink to={MAIN_ROUTE} className={cl.item}>
                {basicStore?.siteTitle.metaValue}
            </NavLink>
            {breadcrumbs.map(({ match, breadcrumb }) => (
                <NavLink to={match.pathname} key={match.pathname} className={cl.currentItem}>
                    <span> / </span>
                    {breadcrumb}
                </NavLink>
            ))}
        </div>
    );
});

export default Breadcrumbs;