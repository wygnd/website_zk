import React, {useContext, useEffect, useState} from 'react';
import {useFetchTextBlock} from "../../../hooks/useFetchTextblock";
import {ContextMain} from "../../../index";
import {getImageById} from "../../../http/galleryAPI";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ModalGallery from "../ModalGallery/ModalGallery";
import cl from './TextBlockAdmin.module.scss';
import {setItem} from "../../../http/basicAPI";
import {observer} from "mobx-react-lite";

const TextBlockAdmin = observer(() => {
	
	useFetchTextBlock();
	
	const {textBlock, galleryStore} = useContext(ContextMain);
	const {desc, image_id} = textBlock.block;
	const [imageId, setImageId] = useState(false);
	const [description, setDescription] = useState(desc || "");
	const [image, setImage] = useState(null);
	const [modal, setModal] = useState(false);
	const [validate, setValidate] = useState(false);
	
	useEffect(() => {
		if(!desc || !image_id) return;
		setDescription(desc);
		setImageId(image_id);
	}, [desc, image_id]);
	
	useEffect(() => {
		if(!imageId) return;
		getImageById(imageId).then((data) => {
			setImage(data);
		});
	}, [imageId]);
	
	
	const saveSettings = async (event) => {
		event.preventDefault();
		event.stopPropagation();
		const form = event.currentTarget;
		if(form.checkValidity() === false) {
			setValidate(true);
			return;
		}
		
		if(description === desc && image_id === imageId) {
			galleryStore.callModalError('Вы ничего не изменили');
			return;
		}
		
		try {
			await setItem('text_desc', description);
			await setItem('text_image', imageId);
			
			textBlock.changeItem('desc', description);
			textBlock.changeItem('image_id', image_id);
			
			galleryStore.callModalSuccess('Запись успешно изменена');
		} catch(err) {
			galleryStore.callModalError('Что-то пошло не так', err);
		}
	}
	
	return (
		<>
			<Form noValidate validated={validate} onSubmit={saveSettings} className="d-flex flex-column">
				
				<div className={cl.text_admin__holder}>
					<Form.Group className={cl.text_admin__desc}>
						<Form.Label>Описание</Form.Label>
						<Form.Control
							as="textarea"
							value={description}
							onChange={(e) => setDescription(e.target.value.replace(/\n/g, "<br />"))}
							style={{height: "250px"}}
							required
						/>
					</Form.Group>
					
					<Form.Group className={cl.text_admin__image}>
						<Form.Label>Изображение</Form.Label>
						<Card className="p-2" style={{height: 250}}>
							{image &&
								<Card.Img
									variant="top"
									height="170px"
									className="object-fit-scale"
									src={image?.file_path}
									alt={image?.file_name}
									id={image?.id}/>
							}
							<Card.Body className="p-1 d-flex">
								<Button className="w-100 mt-auto" onClick={() => setModal(true)}>Изменить</Button>
							</Card.Body>
						</Card>
					</Form.Group>
				</div>
				
				<Button type="submit" className="mx-auto mt-4">
					Сохранить изменения
				</Button>
			</Form>
			<ModalGallery
				open={modal}
				clickHandler={() => setModal(false)}
				setOpen={() => setModal(false)}
				getImageId={(id) => setImageId(id)}
			/>
		</>
	);
});

export default TextBlockAdmin;