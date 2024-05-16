import React from 'react';
import PhonesHolder from "../PhonesHolder/PhonesHolder";
import styles from './Contacts.module.scss';
import SocialsHolder from "../SocialsHolder/SocialsHolder";
import EmailsHolder from "../EmailsHolder/EmailsHolder";
import MyMap from "../../MyMap/MyMap";

const Contacts = () => {
	return (
		<div className={styles.contacts_holder}>
			<div className={styles.contacts_holder__top}>
				<PhonesHolder/>
				<SocialsHolder/>
				<EmailsHolder/>
			</div>
			<div className={styles.contacts_holder__bottom}>
				<h4 className={styles.contacts_holder__h4}>Точка на карте</h4>
				<MyMap/>
			</div>
		</div>
	);
};

export default Contacts;