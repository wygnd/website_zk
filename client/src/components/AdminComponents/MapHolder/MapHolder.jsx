import React, {useContext, useRef, useState} from 'react';
import {ContextMain} from '../../..';
import {setItem} from '../../../http/basicAPI';
import cl from './MapHolder.module.scss';
import {observer} from 'mobx-react-lite';
import MyMap from "../../MyMap/MyMap";

const MapHolder = observer(() => {

	const {contactsStore, galleryStore} = useContext(ContextMain);
	const [mapValue, setMapValue] = useState();
	const ref = useRef(null);

	const saveMap = async () => {
		if(!mapValue) {
			galleryStore.setModalErr(true);
			galleryStore.setModalMsg('Пустое поле');
			setTimeout(() => {
				galleryStore.setModalErr(false);
			}, 2000);
			return;
		}

		await setItem('map', `${mapValue.split(',')[0].trim()}+${mapValue.split(',')[1].trim()}`)
			.then(data => {
				galleryStore.setModalSucc(true);
				galleryStore.setModalMsg('Карта успешно сохранена');
				contactsStore.setUpdate(!contactsStore.update);
				setTimeout(() => {
					galleryStore.setModalSucc(false);
				}, 2000);
			})
	}

	return (
		<div>
			<div className={cl.mapName}>Координаты карты</div>
			{/*<div className={cl.mapWrapper}>*/}
			{/*    <Input placeholder={`${contactsStore.map[0]}, ${contactsStore.map[1]}`} onChange={(e) => setMapValue(e.target.value)} />*/}
			{/*    <Button onClick={saveMap}>Сохранить</Button>*/}
			{/*</div>*/}
			<MyMap/>
		</div>
	);
});

export default MapHolder;