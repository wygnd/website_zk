import React, {useContext} from "react";
import cl from "./Burger.module.scss";
import Logo from "../Logo";
import NavBar from "../NavBar";
import Phones from "../Phones/Phones";
import Socials from "../Socials/Socials";
import AdminPreview from "../AdminComponents/AdminPreview/AdminPreview";
import {ContextMain} from "../../index";

const Burger = ({isOpen, closeMenu, ...props}) => {
	
	const {userStore} = useContext(ContextMain);
	
	return (
		<>
			<div {...props} className={[cl.burger, isOpen && cl.active].join(" ")}>
				<span></span>
				<span></span>
				<span></span>
			</div>
			<div className={[cl.mobileMenu, isOpen && cl.mobileActive].join(" ")}>
				<div className={cl.closeMobileMenu} onClick={() => closeMenu()}>
					&times;
				</div>
				<Logo/>
				<NavBar mobile={true} closeMenu={closeMenu}/>
				<Phones mobile/>
				<Socials mobile/>
				{userStore.isAuth &&
					<AdminPreview/>
				}
			</div>
		</>
	);
};

export default Burger;
