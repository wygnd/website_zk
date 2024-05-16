import React from 'react';
import {observer} from 'mobx-react-lite';
import TourItems from './TourItems/TourItems';
import cl from './Tour.module.scss';
import CreateTour from './CreateTour/CreateTour';

const Tour = observer(() => {
	return (
		<div className={cl.admin_tours}>
			<TourItems/>
			<CreateTour/>
		</div>
	);
});

export default Tour;