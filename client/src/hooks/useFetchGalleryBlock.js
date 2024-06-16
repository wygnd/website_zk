import {useContext, useEffect} from "react";
import {fetchGallery} from "../http/galleryBlockAPI";
import {getImageById} from "../http/galleryAPI";
import {ContextMain} from "../index";


export function useFetchGalleryBlock() {
	const {galleryBlock} = useContext(ContextMain);
	
	useEffect(() => {
		if(galleryBlock?.images.length !== 0) {
			return;
		}
		fetchGallery()
			.then((res) => {
				res.map((el) => {
						getImageById(el?.galleryId, 'medium').then((res) => {
							getImageById(el?.galleryId, 'full').then((data) => {
								galleryBlock.setGallery([...galleryBlock?.images, {...res, file_path_full: data.file_path},]);
							})
						});
					}
				);
			});
	}, [galleryBlock.update]);
}