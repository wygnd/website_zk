import React, {useContext, useEffect, useState} from 'react';
import cl from "../ToursBlock.module.scss";
import {observer} from "mobx-react-lite";
import {getImageById} from "../../../http/galleryAPI";
import {ContextMain} from "../../../index";

const LastTour = observer(() => {

	const {tourStore} = useContext(ContextMain);
	const [file, setFile] = useState('');

	useEffect(() => {
		if(!tourStore?.lastItem) return;
		getImageById(tourStore?.lastItem?.galleryId)
			.then(res => {
				setFile(res)
			});
	}, [tourStore.updateLastItem])

	return (
		<a href={tourStore.lastItem.linkButton} className={cl.lastItem} target="_blank" rel="noreferrer">
			<div className={cl.lastItemName}>{tourStore?.lastItem?.tour_name}</div>
			{file &&
				<div className={cl.lastItemImage}>
					<img src={file?.file_path} alt={file?.file_name}/>
				</div>
			}
		</a>
	);
});

export default LastTour;