import React, { useContext } from 'react';
import Logo from './Logo';
import { ContextMain } from '..';
import NavBar from './NavBar';

const Header = () => {

    const { user } = useContext(ContextMain);

    return (
        <header>
            <div className="header__wrapper">
                <Logo />
                <NavBar />
            </div>
        </header>
    );
};

export default Header;