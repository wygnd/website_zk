import React, { useContext } from 'react';
import Logo from './Logo';
import { ContextMain } from '..';
import NavBar from './NavBar';
import headerClasses from '../styles/Header.module.css';
import Button from './Button';
import { useLocation } from 'react-router-dom';
import { MAIN_ROUTE } from '../utils/consts';

const Header = () => {

    const { user } = useContext(ContextMain);
    const location = useLocation();
    const isMainPage = location.pathname !== MAIN_ROUTE;

    return (
        <header className={[headerClasses.header, isMainPage && headerClasses.header_home].join(' ')}>
            <div className="container">
                <div className={headerClasses.header_holder}>
                    <Logo />
                    <NavBar />
                    {user.isAuth && <Button invert>Админ панель</Button>}
                </div>
            </div>
        </header>
    );
};

export default Header;