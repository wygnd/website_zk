import React, { useContext } from 'react';
import { ContextMain } from '..';
import { observer } from 'mobx-react-lite';
import headerClasses from '../styles/Header.module.scss';
import { Link } from "react-scroll";

const NavBar = observer(({ mobile, closeMenu }) => {

    const { menuElements } = useContext(ContextMain);

    return (
        mobile
            ?
            <ul className={headerClasses.modileVersion}>
                {menuElements.elements.map(el =>
                    <li key={el.id} className={headerClasses.nav_menu_element}>
                        <Link
                            onClick={() => closeMenu()}
                            to={el.link}
                            className={headerClasses.navLink}
                            spy={true}
                            smooth={true}
                            offset={-100}
                            duration={800}

                        >{el.title}</Link>
                    </li>
                )}
            </ul>
            :
            <ul className={headerClasses.menu}>
                {menuElements.elements.map(el =>
                    <li key={el.id} className={headerClasses.nav_menu_element}>
                        <Link
                            to={el.link}
                            spy={true}
                            smooth={true}
                            offset={-60}
                            duration={800}
                            className={headerClasses.navLink}
                        >{el.title}</Link>
                    </li>
                )}
            </ul>

    );
});

export default NavBar;