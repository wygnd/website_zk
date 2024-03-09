import React, {useContext} from 'react';
import cl from './ContactsBlock.module.scss';
import {YMaps, Map, Placemark} from '@pbe/react-yandex-maps';
import Phones from '../Phones/Phones';
import Socials from '../Socials/Socials';
import {observer} from 'mobx-react-lite';
import {ContextMain} from '../..';
import Emails from '../Emails/Emails';
import MyMap from "../MyMap/MyMap";
import Container from "../Container/Container";

const ContactsBlock = observer(() => {
	
	const {contactsStore, basicStore} = useContext(ContextMain);
	
	
	return (
		<div id='contacts__block' className={cl.contactsBlock}>
			<Container>
				<div className={cl.blockHolder}>
					<div className={cl.leftSide}>
						<h2 className={cl.blockTitle}>Контакты</h2>
						{basicStore.phones.length !== 0 &&
							<div className={cl.phonesHolder}>
								<div className={cl.nameHolder}>Номер телефона</div>
								<Phones mobile/>
							</div>
						}
						{basicStore.emails.length !== 0 &&
							<div className={cl.emailsHolder}>
								<div className={cl.nameHolder}>Электронная почта</div>
								<Emails/>
							</div>
						}
						{basicStore.socials.length !== 0 &&
							<div className={cl.socHolder}>
								<Socials mobile/>
							</div>
						}
					</div>
					<MyMap className={cl.map__holder}/>
				</div>
			</Container>
		</div>
	);
});

export default ContactsBlock;