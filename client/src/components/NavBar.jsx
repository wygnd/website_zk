import React, {useContext} from 'react';
import {ContextMain} from '..';
import {observer} from 'mobx-react-lite';
import headerClasses from '../styles/Header.module.scss';

const NavBar = observer(({mobile, closeMenu}) => {
	
	const {menuElements} = useContext(ContextMain);
	
	const clickMenuHandler = (event) => {
		const hash = event.target.hash;
		
		const block = document.getElementById(hash);
		
		if(!block) {
			return null;
		}
		
		block.scrollIntoView({
			behavior: "smooth",
		});
	}
	
	return (
		mobile
			?
			<nav className="mobile-menu">
				<ul className={headerClasses.modileVersion}>
					{menuElements.elements.map(el =>
						<li key={el.id} className={headerClasses.nav_menu_element}>
							<a
								onClick={(event) => {
									closeMenu();
									clickMenuHandler(event);
								}}
								href={el.link}
								className={headerClasses.navLink}
							
							>{el.title}</a>
						</li>
					)}
				</ul>
			</nav>
			:
			<nav className="desctop-menu">
				<ul className={headerClasses.menu}>
					{menuElements.elements.map(el =>
						<li key={el.id} className={headerClasses.nav_menu_element}>
							<a
								onClick={clickMenuHandler}
								href={el.link}
								className={headerClasses.navLink}
							>{el.title}</a>
						</li>
					)}
				</ul>
			</nav>
	);
});

export default NavBar;