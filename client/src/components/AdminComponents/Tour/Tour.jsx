import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {ContextMain} from '../../..';
import TourItems from './TourItems/TourItems';
import cl from './Tour.module.scss';
import CreateTour from './CreateTour/CreateTour';

const Tour = observer(({className}) => {

	const {tourStore} = useContext(ContextMain);

	return (
		<div className={cl.admin_tours}>
			{tourStore.tours.length === 0
				?
				<h4 className={cl.notFound}>Туров на нейдено</h4>
				:
				<TourItems/>
			}
			<CreateTour/>
		</div>
	);
});

export default Tour;