import React, {useContext, useEffect, useState} from 'react';
import cl from './LastItem.module.scss';
import {observer} from 'mobx-react-lite';
import {ContextMain} from '../../../..';
import {getImageById} from '../../../../http/galleryAPI';
import {FaPen} from 'react-icons/fa';
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai';
import {changeOne, changeTour} from '../../../../http/toursAPI';
import ModalGallery from '../../ModalGallery/ModalGallery';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Figure from "react-bootstrap/Figure";

const LastItem = observer(() => {
	
	const {tourStore, galleryStore} = useContext(ContextMain);
	const [name, setName] = useState('');
	const [link, setLink] = useState('');
	const [imageId, setImageId] = useState();
	const [image, setImage] = useState('');
	const [, setModal] = useState(false);
	const [modalGallery, setModalGallery] = useState(false);
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	
	useEffect(() => {
		setName(tourStore.lastItem.tour_name);
		setLink(tourStore.lastItem.linkButton);
		setImageId(tourStore.lastItem.galleryId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tourStore.update]);
	
	useEffect(() => {
		if(!imageId) return;
		getImageById(imageId, 'thumbnail')
			.then(res => {
				setImage(res);
			})
	}, [imageId]);
	
	const setVisibleLastItem = async () => {
		await changeOne('lastTourVisible', !tourStore.lastItemVisible)
			.then(() => {
				tourStore.setLastItemVisible(!tourStore.lastItemVisible);
				tourStore.setUpdate(!tourStore.update);
			})
	}
	
	const saveLastItem = async (event) => {
		event.preventDefault();
		event.stopPropagation();
		const form = event.currentTarget;
		if(!form.checkValidity()) {
			setValidated(true);
			return;
		}
		
		setValidated(false);
		if(name === tourStore.lastItem.tour_name && link === tourStore.lastItem.linkButton && imageId === tourStore.lastItem.galleryId) {
			setModal(false);
			galleryStore.setModalErr(true);
			galleryStore.setModalMsg('Вы ничего не изменили');
			setTimeout(() => {
				galleryStore.setModalErr(false);
			}, 2000);
			return;
		}
		
		await changeTour(tourStore.lastItem.tour_id, name, null, link, imageId)
			.then(() => {
				setShow(false);
				setModal(false);
				galleryStore.setModalSucc(true);
				galleryStore.setModalMsg('Запись успешно изменена');
				tourStore.setUpdateLastItem(!tourStore.updateLastItem);
				setTimeout(() => {
					galleryStore.setModalSucc(false);
				}, 2000);
			})
			.catch(error => {
				galleryStore.setModalErr(true);
				galleryStore.setModalMsg(error.message);
				setTimeout(() => {
					galleryStore.setModalErr(false);
				}, 2000);
			})
	}
	
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	
	return (
		<>
			<div
				className={`${!tourStore.lastItemVisible ? cl.lastItemHolder + " " + cl.lastItemHolder_Hidden : cl.lastItemHolder}`}>
				<div className={cl.lastItemWrapper}>
					<div className={cl.leftItem}>
						<div className={cl.nameItem}>{tourStore.lastItem.tour_name}</div>
						<div className={cl.linkItem}>{tourStore.lastItem.linkButton}</div>
						{image?.file_ext &&
							<div className={cl.imageItem}>
								<img src={image?.file_path} alt={image?.file_name}/>
							</div>
						}
					</div>
					<div className={cl.rightItem}>
						<FaPen
							onClick={handleShow}
						/>
						{tourStore.lastItemVisible
							?
							<AiFillEye
								onClick={setVisibleLastItem}
							/>
							:
							<AiFillEyeInvisible
								onClick={setVisibleLastItem}
							/>
						}
					</div>
				</div>
			</div>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Последний элемент</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form
						noValidate
						validated={validated}
						className="d-flex flex-column"
						onSubmit={saveLastItem}
					>
						<Form.Group className="mb-3">
							<Form.Label>Заголовок</Form.Label>
							<Form.Control
								placeholder="Заголовок"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Ссылка</Form.Label>
							<Form.Control
								placeholder="Ссылка"
								value={link}
								onChange={(e) => setLink(e.target.value)}
								required
							/>
						</Form.Group>
						<Figure className="mx-auto mb-3">
							<Figure.Image
								width={100}
								height={100}
								className="mb-0 me-3 p-3 bg-primary"
								alt={image.file_name || "post-image"}
								src={`${
									image.file_path
										? image.file_path
										: "/assets/images/placeholder.png"
								}`}
							/>
							<Button variant="secondary" onClick={() => setModalGallery(true)}>
								Выбрать изображение
							</Button>
						</Figure>
						<Button type="submit" variant="success" className="ms-auto">Сохранить</Button>
					</Form>
				</Modal.Body>
			</Modal>
			<ModalGallery
				open={modalGallery}
				clickHandler={() => setModalGallery(false)}
				setOpen={() => setModalGallery(false)}
				getImageId={(id) => setImageId(id)}
			/>
		</>
	);
});

export default LastItem;