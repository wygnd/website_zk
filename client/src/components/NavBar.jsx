import React, { useContext } from 'react';
import { ContextMain } from '..';
import { Link } from 'react-router-dom';

const NavBar = () => {

    const { menuElements } = useContext(ContextMain);

    console.log(menuElements);

    return (
        <ul className='menu'>
            {menuElements.map(el =>
                <li key={el.id} className='nav-menu-element'>
                    <Link to={el.link}>{el.title}</Link>
                </li>
            )}
        </ul>
    );
};

export default NavBar;