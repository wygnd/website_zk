import React from 'react';
import { Link } from 'react-router-dom';
import headerClasses from '../styles/Header.module.css';

const Logo = () => {
    return (
        <Link to='/' className={headerClasses.logo_holder}>
            <img src="" alt="logo" />
        </Link>
    );
};

export default Logo;