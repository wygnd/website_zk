import {observer} from 'mobx-react-lite';
import React, {useContext, useEffect, useState} from 'react';
import {ContextMain} from '../../../..';
import TourItem from '../TourItem/TourItem';
import LastItem from "../LastItem/LastItem";
import {fetchLastTour, fetchTours, saveTours} from "../../../../http/toursAPI";
import {fetchItem} from "../../../../http/basicAPI";
import ListGroup from "react-bootstrap/ListGroup";
import {Reorder} from "framer-motion";
import cl from "./TourItems.module.scss";
import {useFetchTours} from "../../../../hooks/useFetchTours";


const TourItems = observer(() => {
	
	useFetchTours();
	
	const {tourStore} = useContext(ContextMain);
	const [posts, setPosts] = useState(null);
	
	useEffect(() => {
		setPosts(tourStore?.tours);
	}, []);
	
	if(!posts) {
		return null;
	}
	
	const handleDragEnd = async () => {
		posts.map((t, index) => {
			t.order = index;
		})
		tourStore.setTours(posts);
		try {
			await saveTours(posts);
		} catch(err) {
			console.log(err);
		}
	}
	
	return (
		<>
			<Reorder.Group
				axis="y"
				onReorder={setPosts}
				values={posts}
				className={cl.tour__items}
				onPanEnd={handleDragEnd}
			>
				<ListGroup className="mb-4">
					{posts.map(el =>
						<TourItem
							key={el.tour_id}
							item={el}
						/>
					)}
					<ListGroup.Item>
						<LastItem/>
					</ListGroup.Item>
				</ListGroup>
			</Reorder.Group>
		</>
	);
});

export default TourItems;