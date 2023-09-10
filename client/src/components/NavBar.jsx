import React, { useContext } from 'react';
import { ContextMain } from '..';
import { observer } from 'mobx-react-lite';
import headerClasses from '../styles/Header.module.css';

const NavBar = observer(() => {

    const { menuElements } = useContext(ContextMain);

    return (
        <ul className={headerClasses.menu}>
            {menuElements.elements.map(el =>
                <li key={el.id} className={headerClasses.nav_menu_element}>
                    <a href={el.link}>{el.title}</a>
                </li>
            )}
        </ul>
    );
});

export default NavBar;