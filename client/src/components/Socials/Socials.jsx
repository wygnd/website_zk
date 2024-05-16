import React, {useContext} from 'react';
import {ContextMain} from '../..';
import cl from './Socials.module.scss';
import {observer} from 'mobx-react-lite';
import SocialItem from '../SocialItem';

const Socials = observer(({mobile}) => {
	const {basicStore} = useContext(ContextMain);
	
	if(!basicStore.socials) {
		return;
	}
	
	return (
		mobile
			?
			basicStore.socials &&
			<div className={cl.socHolderMobile}>
				{basicStore.socials.map(soc =>
					<SocialItem
						key={soc.metaKey}
						link={soc.metaValue}
						imageId={soc.iconId}
						className={cl.socItem}
					/>
				)}
			</div>
			:
			basicStore.socials &&
			<div className={cl.socHolder}>
				{basicStore.socials.map(soc => {
					return <SocialItem
						key={soc.metaKey}
						link={soc.metaValue}
						imageId={soc.iconId}
						className={cl.socItem}
					/>
				})}
			</div>
	);
});

export default Socials;