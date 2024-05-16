import {useContext, useEffect} from "react";
import {ContextMain} from "../index";
import {fetchItem} from "../http/basicAPI";
import {getImageById} from "../http/galleryAPI";


export function useFetchAbout() {
	const {about} = useContext(ContextMain);
	
	useEffect(() => {
		if(about.desc || about?.image) {
			return;
		}
		
		if(!about?.desc) {
			fetchItem("about_desc").then((data) => {
				about.setDesc(data.metaValue);
			});
		}
		
		if(!about?.image) {
			fetchItem("about_image").then((data) => {
				getImageById(data.metaValue).then((res) => {
					about.setImage(res);
				});
			});
		}
	}, []);
}
