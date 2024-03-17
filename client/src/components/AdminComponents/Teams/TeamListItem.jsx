import React, {useContext, useEffect, useState} from 'react';
import {getImageById} from "../../../http/galleryAPI";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import {FaPen} from "react-icons/fa6";
import ModalGallery from "../ModalGallery/ModalGallery";
import {changeTeam} from "../../../http/teamsApi";
import {ContextMain} from "../../../index";

const TeamListItem = ({team_id, title, description, image_id}) => {
	
	const [image, setImage] = useState(null);
	const [modal, setModal] = useState(false);
	const [validated, setValidated] = useState(false);
	const [name, setName] = useState(title);
	const [desc, setDesc] = useState(description);
	const [imageId, setImageId] = useState(image_id);
	const [changeButtonImage, setChangeButtonImage] = useState(false);
	const [showGallery, setShowGallery] = useState(false);
	const {galleryStore} = useContext(ContextMain);
	
	const getDataImage = async () => {
		const data = await getImageById(imageId, 'large');
		setImage(data);
	}
	
	useEffect(() => {
		getDataImage();
	}, [imageId])
	
	const toggleModal = () => setModal(!modal);
	
	const handleSubmit = async (event) => {
		event.preventDefault();
		event.stopPropagation();
		
		setValidated(true);
		
		try {
			await changeTeam(
				team_id, {
					title: name,
					description: desc,
					image_id: imageId,
				}
			)
		} catch(e) {
			galleryStore.setModalErr(true);
			galleryStore.setModalMsg("Что-то пошло не так", e?.message);
			setTimeout(() => {
				galleryStore.setModalErr(false);
			}, 3000)
			return;
		}
		
		galleryStore.setModalSucc(true);
		galleryStore.setModalMsg("Запись успшно изменена");
		setTimeout(() => {
			galleryStore.setModalSucc(false);
		}, 3000);
		setModal(false);
	};
	
	const handleChangeDesc = (e) => {
		setDesc(e.target.value)
	}
	
	const handleChangeName = (e) => {
		setName(e.target.value)
	}
	
	return (
		<>
			<Card as="li" data-team={team_id}>
				{image &&
					<Card.Img
						variant="top"
						src={image.file_path}
						height={200}
						loading="lazy"
						decoding="async"
						alt={image.file_name}
						style={{
							objectFit: "contain",
							padding: 15
						}}
					/>
				}
				<Card.Body>
					<Card.Title>{name}</Card.Title>
					<Card.Text>
						{desc}
					</Card.Text>
					<Button variant="primary" onClick={toggleModal}>Изменить</Button>
				</Card.Body>
			</Card>
			<Modal show={modal} onHide={toggleModal} size="sm">
				<Modal.Header closeButton>
					<Modal.Title>
						Изменить<br/><b>{name}</b>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form noValidate validated={validated} onSubmit={handleSubmit}>
						{image &&
							<Form.Group style={{
								position: "relative"
							}}>
								<Image
									decoding="async"
									loading="lazy"
									src={image.file_path}
									alt={image.file_name}
									style={{
										width: "100%",
										height: "100%",
										objectFit: "contain",
										marginBottom: 20,
										maxHeight: 200
									}}
									onMouseOver={() => setChangeButtonImage(true)}
									onMouseOut={() => setChangeButtonImage(false)}
								/>
								{changeButtonImage &&
									<Button variant="secondary" className="d-flex align-items-center justify-content-center" style={{
										position: "absolute",
										top: 10,
										right: 10,
										borderRadius: "100%",
										width: 40,
										height: 40
									}}
									        onClick={() => setShowGallery(true)}
									        onMouseOver={() => setChangeButtonImage(true)}
									        onMouseOut={() => setChangeButtonImage(false)}
									>
										<FaPen/>
									</Button>
								}
							</Form.Group>
						}
						<Form.Group className="mb-4">
							<Form.Label>Название</Form.Label>
							<Form.Control
								required
								type="text"
								placeholder="Название..."
								defaultValue={name}
								onChange={handleChangeName}
							/>
							<Form.Control.Feedback type="invalid">
								Поле должно быть заполнено
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group className="mb-4">
							<Form.Label>Описание</Form.Label>
							<Form.Control
								type="area"
								placeholder="Описание..."
								defaultValue={desc ?? ""}
								onChange={handleChangeDesc}
							/>
						</Form.Group>
						<Button type="submit" style={{width: "100%"}}>Сохранить</Button>
					</Form>
				</Modal.Body>
			</Modal>
			<ModalGallery
				open={showGallery}
				clickHandler={() => setShowGallery(false)}
				setOpen={() => setShowGallery(false)}
				getImageId={(id) => setImageId(id)}
			/>
		</>
	);
};

export default TeamListItem;