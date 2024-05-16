import React, {useEffect, useState} from 'react';
import clsx from "clsx";
import {getImageById} from "../../http/galleryAPI";
import styles from "./TeamsBlock.module.scss";

const TeamItem = ({className, team}) => {
	
	const {title, description, image_id} = team;
	
	const [image, setImage] = useState(null);
	
	useEffect(() => {
		getImageById(image_id).then((image) => {
			setImage(image);
		})
	}, [image_id]);
	
	return (
		<div className={clsx(className, styles.teamItem)}>
			{image &&
				<div className={styles.teamItem__image}>
					<img src={image.file_path} alt={image.file_name} loading="lazy" decoding="async"/>
				</div>
			}
			<div className={styles.teamItem__name}>{title}</div>
			{description &&
				<div className={styles.teamItem__desc}>{description}</div>
			}
		</div>
	);
};

export default TeamItem;