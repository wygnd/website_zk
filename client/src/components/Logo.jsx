import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import headerClasses from '../styles/Header.module.css';
import { observer } from 'mobx-react-lite';
import { ContextMain } from '..';

const Logo = observer(() => {

    const { galleryStore } = useContext(ContextMain);

    useMemo(() => {
        console.log('mem');
    }, []);

    return (
        <Link to='/' className={headerClasses.logo_holder}>
            <img src={galleryStore.getLogo.src} alt={galleryStore.getLogo.fileName} />
        </Link>
    );
});

export default Logo;