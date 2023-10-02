import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import headerClasses from '../styles/Header.module.css';
import { observer } from 'mobx-react-lite';
import { ContextMain } from '..';
import { SERVER_URL } from '../utils/consts';

const Logo = observer(() => {

    const { basicStore } = useContext(ContextMain);

    return (
        <Link to='/' className={headerClasses.logo_holder}>
            {basicStore?.logo?.metaValue &&
                <img src={`${SERVER_URL}/${basicStore?.logo?.metaValue}`} />
            }
        </Link>
    );
});

export default Logo;