import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import {FaPen} from "react-icons/fa6";
import ModalGallery from "../ModalGallery/ModalGallery";
import {changeTeam} from "../../../http/teamsApi";
import {ContextMain} from "../../../index";
import {observer} from "mobx-react-lite";

const ChangeTeamItem = observer(({team_id, title, setTitle, description, setDesc, image, setImageId}) => {
	
	const [changeButtonImage, setChangeButtonImage] = useState(false);
	const [showGallery, setShowGallery] = useState(false);
	const [validated, setValidated] = useState(false);
	const [modal, setModal] = useState(false);
	const {galleryStore, teamsStore} = useContext(ContextMain);
	
	const handleChangeDesc = (e) => {
		setDesc(e.target.value)
	}
	
	const handleChangeName = (e) => {
		setTitle(e.target.value)
	}
	
	const handleSubmit = async (event) => {
		event.preventDefault();
		event.stopPropagation();
		
		setValidated(true);
		
		try {
			await changeTeam(
				team_id, {
					title: title,
					description: description,
					image_id: image.id,
				}
			);
			teamsStore.changeTeam(team_id, title, description, image.id);
			galleryStore.callModalSuccess("Запись успешно изменена");
		} catch(e) {
			console.log(e);
			galleryStore.callModalError("Что-то пошло не так", e?.message);
			return;
		}
		
		setModal(false);
	};
	
	const toggleModal = () => setModal(!modal);
	
	return (
		<>
			<Button className="mt-auto" variant="primary" onClick={toggleModal}>Изменить</Button>
			<Modal show={modal} onHide={toggleModal} size="sm">
				<Modal.Header closeButton>
					{title &&
						<Modal.Title>
							Изменить<br/><h6>{title}</h6>
						</Modal.Title>
					}
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
								defaultValue={title}
								onChange={handleChangeName}
							/>
							<Form.Control.Feedback type="invalid">
								Поле должно быть заполнено
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group className="mb-4">
							<Form.Label>Описание</Form.Label>
							<Form.Control
								as="textarea"
								type="text"
								placeholder="Описание..."
								defaultValue={description}
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
});

export default ChangeTeamItem;