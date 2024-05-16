import {useContext, useEffect} from "react";
import {ContextMain} from "../index";
import {fetchItem} from "../http/basicAPI";

export function useFetchTextBlock() {
	const {textBlock} = useContext(ContextMain);
	const {title, desc, image_id} = textBlock.block;
	
	useEffect(() => {
		if(!title || title === "") {
			fetchItem("text_title").then((data) => {
				textBlock.changeItem(data.metaKey.split('_')[1], data.metaValue);
			});
		}
		
		if(!desc || desc === "") {
			fetchItem("text_desc").then((data) => {
				textBlock.changeItem(data.metaKey.split('_')[1], data.metaValue);
			});
		}
		
		if(!image_id) {
			fetchItem("text_image").then((data) => {
				textBlock.changeItem("image_id", Number(data.metaValue));
			});
		}
	}, []);
}