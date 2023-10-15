import React from 'react';
import cl from './Burger.module.css';
import Logo from '../Logo';
import NavBar from '../NavBar';
import Phones from '../Phones/Phones';
import Socials from '../Socials/Socials';

const Burger = ({ isOpen, closeMenu, ...props }) => {
    return (
        <>
            <div {...props} className={[cl.burger, isOpen && cl.active].join(' ')}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={[cl.mobileMenu, isOpen && cl.mobileActive].join(' ')}>
                <div className={cl.closeMobileMenu} onClick={() => closeMenu()}>&times;</div>
                <Logo />
                <NavBar mobile={true} closeMenu={closeMenu} />
                <Phones mobile />
                <Socials mobile />
            </div>
        </>
    );
};

export default Burger;