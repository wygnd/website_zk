import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import {FaPen} from "react-icons/fa6";
import ModalGallery from "../ModalGallery/ModalGallery";
import {ContextMain} from "../../../index";
import {getImageById} from "../../../http/galleryAPI";
import {createTeam} from "../../../http/teamsApi";
import {observer} from "mobx-react-lite";

const AddNewTeamItem = observer(() => {
	const [modal, setModal] = useState(false);
	const [validate, setValidate] = useState(false);
	const [image, setImage] = useState(null);
	const [newPost, setNewPost] = useState({
		title: "",
		description: "",
		image_id: null
	})
	const [showGallery, setShowGallery] = useState(false);
	const [changeButtonImage, setChangeButtonImage] = useState(false);
	const {galleryStore, teamsStore} = useContext(ContextMain);
	
	useEffect(() => {
		if(!newPost.image_id) {
			return
		}
		
		fetchImageById();
	}, [newPost.image_id]);
	
	const handleCloseModal = () => {
		setModal(false);
		setNewPost({
			title: "",
			description: "",
			image_id: null
		})
	};
	
	const handleChangeInput = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		
		setNewPost({...newPost, [name]: value});
	}
	
	const fetchImageById = async () => {
		const data = await getImageById(newPost.image_id);
		setImage(data);
	};
	
	const handleSubmit = async (event) => {
		event.preventDefault();
		event.stopPropagation();
		
		setValidate(true);
		
		if(!newPost.image_id) {
			galleryStore.callModalError("Изображение не выбрано");
			return;
		}
		
		try {
			const response = await createTeam(newPost);
			teamsStore.addTeam(response);
		} catch(e) {
			galleryStore.callModalError("Что-то пошло не так", e?.message);
			return;
		}
		
		galleryStore.callModalSuccess("Запись успешно добавлена");
		setModal(false);
		setNewPost({
			title: "",
			description: "",
			image_id: null
		});
		setValidate(false);
	};
	
	return (
		<>
			<Button className="teams-holder__new-item" variant="outline-primary" onClick={() => setModal(true)}>
				Добавить новую запись
			</Button>
			<Modal show={modal} onHide={handleCloseModal}>
				<Modal.Header closeButton>
					<Modal.Title>Добавить запись</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form noValidate validated={validate} onSubmit={handleSubmit}>
						<Form.Group style={{
							position: "relative"
						}}>
							{newPost.image_id ?
								<>
									{image &&
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
									}
									{changeButtonImage &&
										<Button variant="secondary" className="d-flex align-items-center justify-content-center"
										        style={{
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
								</>
								:
								<Button
									variant="outline-primary"
									className="mb-4 w-100"
									onClick={() => setShowGallery(true)}
								>
									Добавить изображение
								</Button>
							}
						</Form.Group>
						<Form.Group className="mb-4">
							<Form.Label>Название</Form.Label>
							<Form.Control
								required
								type="text"
								name="title"
								placeholder="Название..."
								defaultValue={newPost.title}
								onChange={handleChangeInput}
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
								name="description"
								placeholder="Описание..."
								defaultValue={newPost.description}
								onChange={handleChangeInput}
							/>
						</Form.Group>
						<Button type="submit" style={{width: "100%"}}>Сохранить</Button>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={handleCloseModal}>Закрыть</Button>
				</Modal.Footer>
			</Modal>
			<ModalGallery
				open={showGallery}
				clickHandler={() => setShowGallery(false)}
				setOpen={() => setShowGallery(false)}
				getImageId={(id) => setNewPost({...newPost, image_id: id})}
			/>
		</>
	);
});

export default AddNewTeamItem;