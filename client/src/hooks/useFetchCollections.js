import {useContext, useEffect} from "react";
import {fetchItem} from "../http/basicAPI";
import {getImageById} from "../http/galleryAPI";
import uuid from "react-uuid";
import {ContextMain} from "../index";

export function useFetchCollections() {
	const {collections} = useContext(ContextMain);
	
	useEffect(() => {
		
		if(!collections?.desc) {
			fetchItem("collections_desc").then((data) => {
				collections.setDesc(data);
			});
		}
		
		if(collections?.gallery.length === 0) {
			fetchItem("collections_images").then((data) => {
				if(!data) return;
				collections.setGallery([]);
				const arrayImages = data.metaValue.split("+");
				arrayImages.map((img) =>
					getImageById(img).then((response) => {
						collections.addGallery({...response, uuId: uuid()});
					})
				);
				collections.setCountImages(data.metaValue.split("+").length);
			});
		}
	}, []);
}