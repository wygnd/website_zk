import React, {useContext} from "react";
import {Link} from "react-router-dom";
import headerClasses from "../styles/Header.module.scss";
import {observer} from "mobx-react-lite";
import {ContextMain} from "..";

const Logo = observer(() => {
	const {basicStore} = useContext(ContextMain);

	return (
		<Link to="/" className={headerClasses.logo_holder}>
			{basicStore?.logo?.file_path ? (
				<picture>
					<img
						src={basicStore?.logo?.file_path}
						alt={`${basicStore?.logo?.file_name}`}
						loading="lazy"
					/>
				</picture>
			) : (
				<picture>
					<img
						src="/assets/images/placeholder.png"
						alt="site-logo"
						loading="lazy"
					/>
				</picture>
			)
			}
		</Link>
	);
});

export default Logo;
