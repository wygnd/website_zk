import React, {useEffect, useState} from 'react';
import clsx from "clsx";
import Container from "../Container/Container";
import {getImageById} from "../../http/galleryAPI";

const TextBlock = ({id, className, isReversed, title, description, image_id}) => {
	
	const [image, setImage] = useState(null);
	
	useEffect(() => {
		
		getImageById(image_id).then((data) => {
			console.log(data);
		});
		
	}, [image_id]);
	
	return (
		<div id={id} className={clsx(className, "text-block")}>
			<Container>
				{title &&
					<h2 className="title text-block_title">{title}</h2>
				}
				<div className={clsx("text-block_holder", isReversed && "reversed")}>
					{description &&
						<div className="text-block_description">{description}</div>
					}
					{image &&
						<div className="text-block_image">{image_id}</div>
					}
				</div>
			</Container>
		</div>
	);
};

export default TextBlock;