import {observer} from 'mobx-react-lite';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import cl from './About.module.scss';
import {ContextMain} from '../../..';
import {getImageById} from '../../../http/galleryAPI';
import ModalGallery from '../ModalGallery/ModalGallery';
import {saveBlockDesc, saveBlockGallery} from '../../../http/aboutAPI';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useFetchAbout} from "../../../hooks/useFetchAbout";

const About = observer(({}) => {
	
	const {about, galleryStore} = useContext(ContextMain);
	const [desc, setDesc] = useState('');
	const [image, setImage] = useState({});
	const [imageId, setImageId] = useState();
	const [modal, setModal] = useState(false);
	const [validate, setValidate] = useState(false);
	
	useFetchAbout(about.update);
	
	useEffect(() => {
		if(!about.desc && !about.image) return;
		setDesc(about.desc);
		setImage(about.image);
		setImageId(about.image?.id);
	}, [about.update, about.desc, about.image])
	
	useMemo(() => {
		if(!imageId) return;
		getImageById(imageId)
			.then(data => {
				setImage(data);
			})
	}, [imageId])
	
	
	const saveBlock = async (event) => {
		event.preventDefault();
		event.stopPropagation();
		const form = event.currentTarget;
		if(form.checkValidity() === false) {
			setValidate(true);
			return;
		}
		
		if(desc === about.desc && imageId === about.image.id) {
			galleryStore.callModalError('Вы ничего не изменили');
			return;
		}
		
		await saveBlockDesc(desc)
			.then(() => {
				about.setDesc(desc);
			})
			.catch(error => {
				galleryStore.callModalError(error?.message);
			})
		await saveBlockGallery(imageId)
			.then(() => {
				about.setImage(image);
			})
			.catch(error => {
				galleryStore.callModalError(error?.message);
			})
		galleryStore.callModalSuccess('Данные успешно изменены');
	}
	
	return (
		<>
			<Form noValidate validated={validate} onSubmit={saveBlock} className={cl.blockForm}>
				<Form.Label>Описание</Form.Label>
				<Form.Group className={cl.blockHolder}>
					<Form.Group className={cl.blockHolder_description}>
						<Form.Control
							as="textarea"
							placeholder="Описание блока"
							value={desc}
							onChange={(e) => setDesc(e.target.value.replace(/\n/g, "<br />"))}
							className={cl.descBlock}
							required
						/>
					</Form.Group>
					
					<div className={cl.imageHolder}>
						{image?.file_path
							?
							<div className={cl.image}>
								<img src={image?.file_path} alt={image?.file_name}/>
							</div>
							:
							<h4 className={cl.notFound}>Изображение не найдено</h4>
						}
						<div className={cl.buttons}>
							<Button variant="outline-primary" onClick={() => setModal(true)}>Выбрать изображение</Button>
							<Button type="submit">Сохранить</Button>
						</div>
					</div>
				</Form.Group>
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

export default About;