import React, {useEffect, useState} from 'react';
import {getImageById} from "../../../http/galleryAPI";
import Card from "react-bootstrap/Card";
import ChangeTeamItem from "./ChangeTeamItem";
import RemoveTeamItem from "./RemoveTeamItem";
import {Reorder, useDragControls} from "framer-motion";
import {MdDragIndicator} from "react-icons/md";

const TeamListItem = ({team, index, ...props}) => {
	
	const {id, title, description, image_id} = team;
	const [image, setImage] = useState(null);
	const [name, setName] = useState(title || "");
	const [desc, setDesc] = useState(description || "");
	const [imageId, setImageId] = useState(image_id);
	const controls = useDragControls()
	
	useEffect(() => {
		getImageById(imageId, 'large').then(res => {
			setImage(res);
		})
	}, [imageId])
	
	
	return (
		<Reorder.Item
			value={team}
			as="li"
			data-team={id}
			data-index={index}
			dragListener={false}
			dragControls={controls}
			whileDrag={{
				scale: 1.05,
				opacity: .8
			}}
			{...props}
		>
			<Card
				className="teams-holder__item"
			>
				<MdDragIndicator className="teams-holder__item_drag" onPointerDown={(e) => controls.start(e)}/>
				{image &&
					<Card.Img
						variant="top"
						src={image.file_path}
						height={200}
						loading="lazy"
						decoding="async"
						alt={image.file_name}
						className="w-50"
						style={{
							objectFit: "contain",
							padding: 15,
							maxHeight: 200,
						}}
					/>
				}
				<Card.Body className="d-flex flex-column gap-1">
					{name &&
						<Card.Title as="h5">{name}</Card.Title>
					}
					{desc &&
						<Card.Text as="span" className="mb-2">
							{desc}
						</Card.Text>
					}
					<span className="teams-holder__item_buttons">
						<ChangeTeamItem
							team_id={id}
							title={name}
							setTitle={setName}
							description={desc}
							setDesc={setDesc}
							image={image}
							setImageId={setImageId}
						/>
						<RemoveTeamItem team_id={id}/>
					</span>
				</Card.Body>
			</Card>
		</Reorder.Item>
	);
};

export default TeamListItem;