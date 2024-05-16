import React, {useContext} from 'react';
import {ContextMain} from '..';
import {observer} from 'mobx-react-lite';
import headerClasses from '../styles/Header.module.scss';

const NavBar = observer(({mobile, closeMenu}) => {
	
	const {menuElements} = useContext(ContextMain);
	
	const clickMenuHandler = (event) => {
		const target = event.target;
		const hash = target.hash;
		
		const block = document.querySelector(hash);
		
		if(!block) {
			return;
		}
		
		const liElements = document.querySelectorAll('header .menu ul li a');
		
		liElements.forEach((liElement) => {
			liElement.classList.remove(headerClasses.navLink__active);
		})
		
		target.classList.add(headerClasses.navLink__active);
		
		block.scrollIntoView({
			behavior: "smooth",
		});
	}
	
	return (
		mobile
			?
			<nav className="menu mobile-menu">
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
			<nav className="menu desctop-menu">
				<ul className={headerClasses.menu}>
					{menuElements.elements.map(el =>
						<li key={el.id} className={headerClasses.nav_menu_element}>
							<a
								onClick={clickMenuHandler}
								href={el.link}
								className={headerClasses.navLink}
							>
								{el.title}
							</a>
						</li>
					)}
				</ul>
			</nav>
	);
});

export default NavBar;