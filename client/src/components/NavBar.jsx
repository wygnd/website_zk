import React, { useContext } from 'react';
import { ContextMain } from '..';
import { observer } from 'mobx-react-lite';
import headerClasses from '../styles/Header.module.css';
import { Link, animateScroll as scroll } from "react-scroll";

const NavBar = observer(({ mobile }) => {

    const { menuElements } = useContext(ContextMain);

    return (
        mobile
            ?
            <ul className={headerClasses.modileVersion}>
                {menuElements.elements.map(el =>
                    <li key={el.id} className={headerClasses.nav_menu_element}>
                        <Link
                            to={el.link}
                            className={headerClasses.navLink}
                            activeClass={headerClasses.activeNavLink}
                            spy={true}
                            smooth={true}
                            offset={-60}
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
                            activeClass={headerClasses.activeNavLink}
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