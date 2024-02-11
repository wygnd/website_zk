import {observer} from 'mobx-react-lite';
import React, {useContext, useEffect, useState} from 'react';
import cl from './ToursBlock.module.scss';
import {ContextMain} from '../..';
import TourItem from './TourItem/TourItem';
import {getImageById} from '../../http/galleryAPI';
import {SERVER_URL} from '../../utils/consts';
import LastTour from "./LastTour/LastTour";

const ToursBlock = observer(() => {

	const {tourStore} = useContext(ContextMain);

	if(tourStore.tours.length === 0) return;

	if(tourStore.tours.length === 0) {
		return;
	}
	return (
		<section id='tours__block' className={cl.tourBlock}>
			<div className="container">
				<h2 className={cl.blockTitle}>Экскурсии</h2>
				<div className={cl.toursHolder}>
					{tourStore.tours.map(t =>
						<TourItem
							key={t.tour_id}
							name={t.tour_name}
							textButton={t.textButton}
							linkButton={t.linkButton}
							galleryId={t.galleryId}
						/>
					)}
					{tourStore.lastItemVisible &&
						<LastTour/>
					}
				</div>
			</div>
		</section>
	);
});

export default ToursBlock;