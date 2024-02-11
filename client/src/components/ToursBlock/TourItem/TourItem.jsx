import React, {useEffect, useState} from "react";
import {createFilePath, getImageById} from "../../../http/galleryAPI";
import cl from "./TourItem.module.scss";
import {Link} from "react-router-dom";

const TourItem = ({name, textButton, linkButton, galleryId}) => {
	const [file, setFile] = useState("");

	useEffect(() => {
		getImageById(galleryId).then((data) => {
			const file_path_medium = createFilePath(data.file_name, data.file_ext, 'medium');
			setFile({...data, file_path_medium});
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Link to={linkButton} target="_blank" className={cl.tourItem}>
			{file?.file_path && (
				<div className={cl.image}>
					<picture>
						<source srcSet={file?.file_path_medium} media="(max-width: 992px)"/>
						<img src={file?.file_path} alt={file?.file_name} loading="lazy"/>
					</picture>
				</div>
			)}
			<div className={cl.bodyItem}>
				<div className={cl.topSide}>
					<div className={cl.nameItem}>{name}</div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
					>
						<path
							d="M7 7L17 17M17 17V9M17 17H9"
							stroke="#0A1C27"
							strokeWidth="2.3"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
				<div className={cl.linkButton}>{textButton}</div>
			</div>
		</Link>
	);
};

export default TourItem;
