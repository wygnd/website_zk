import React, { useContext } from 'react';
import Logo from './Logo';
import { ContextMain } from '..';
import NavBar from './NavBar';
import headerClasses from '../styles/Header.module.css';
import Button from './Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, MAIN_ROUTE } from '../utils/consts';

const Header = () => {

    const { user } = useContext(ContextMain);
    const location = useLocation();
    const isMainPage = location.pathname !== MAIN_ROUTE;
    const history = useNavigate();

    return (
        <header className={[headerClasses.header, isMainPage && headerClasses.header_home].join(' ')}>
            <div className="container">
                <div className={headerClasses.header_holder}>
                    <Logo />
                    <NavBar />
                    {user.isAuth && <Button invert onClick={() => history(ADMIN_ROUTE)}>Админ панель</Button>}
                </div>
            </div>
        </header>
    );
};

export default Header;