import React, {useContext, useEffect, useState} from 'react';
import {FullscreenControl, Map, Placemark, TypeSelector, ZoomControl} from "@pbe/react-yandex-maps";
import {useLocation} from "react-router-dom";
import {fetchItem, setItem} from "../../http/basicAPI";
import {ContextMain} from "../../index";
import {observer} from "mobx-react-lite";
import {clsx} from 'clsx';

const MyMap = observer(({className}) => {

	const {basicStore} = useContext(ContextMain);
	const [cord, setCord] = useState([]);
	const location = useLocation();


	useEffect(() => {
		fetchItem("map").then(data => {
			basicStore.setMap([parseFloat(data.metaValue.split(',')[0]), parseFloat(data.metaValue.split(',')[1])])
			setCord(basicStore.map);
		})
	}, [])


	if(location.pathname === "/admin") {
		function onClickMap(e) {
			setCord(e.get('coords'));
			basicStore.setMap(e.get('coords'));
			setItem('map', e.get('coords').join(',')).then(() => {
			}).catch(e => {
				console.log("check error", e);
			})
		}

		return (
			<>

				<Map
					defaultState={{
						center: [59.220501, 39.891525],
						zoom: 13,
						controls: [],
					}}
					width=""
					height="400px"
					onClick={onClickMap}
				>
					<Placemark geometry={basicStore.map}/>
					<FullscreenControl/>
					<ZoomControl/>
					<TypeSelector/>
				</Map>
			</>
		);
	} else {
		return (
			<Map
				defaultState={{
					center: [59.220501, 39.891525],
					zoom: 13,
					controls: [],
				}}
				width=""
				height="400px"
			>
				<Placemark geometry={basicStore.map}/>
				<FullscreenControl/>
				<ZoomControl/>
				<TypeSelector/>
			</Map>
		);
	}


});

export default MyMap;