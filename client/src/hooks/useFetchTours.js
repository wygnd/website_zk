import {useContext, useEffect} from "react";
import {fetchLastTour, fetchTours} from "../http/toursAPI";
import {fetchItem} from "../http/basicAPI";
import {ContextMain} from "../index";

export function useFetchTours() {
	const {tourStore} = useContext(ContextMain);
	
	useEffect(() => {
		if(tourStore.tours.length !== 0) {
			return;
		}
		fetchTours().then((data) => {
			tourStore.setTours(data);
		});
		
		fetchItem("lastTourVisible").then((data) => {
			if(data.metaValue === "0") {
				tourStore.setLastItemVisible(false);
			} else {
				tourStore.setLastItemVisible(true);
			}
		});
		if(!tourStore.setLastItemVisible) {
			return;
		}
		fetchLastTour().then(data => {
			if(!data) return;
			tourStore.setLastItem(data);
		})
	}, [tourStore.tours]);
}