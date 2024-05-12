import React, {useContext, useEffect, useMemo, useState} from "react";
import cl from "./Collections.module.scss";
import {observer} from "mobx-react-lite";
import {ContextMain} from "../../..";
import ModalGallery from "../ModalGallery/ModalGallery";
import {createFilePath, getImageById} from "../../../http/galleryAPI";
import uuid from "react-uuid";
import {saveBlockDesc, saveBlockGallery} from "../../../http/collectionsAPI";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {CiSquarePlus} from "react-icons/ci";
import Form from "react-bootstrap/Form";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {useFetchCollections} from "../../../hooks/useFetchCollections";

const Collections = observer(({className}) => {
	const {collections, galleryStore} = useContext(ContextMain);
	const [desc, setDesc] = useState("");
	const [modal, setModal] = useState(false);
	const [imageId, setImageId] = useState(null);
	const [validate, setValidate] = useState(false);
	
	useFetchCollections();
	
	useEffect(() => {
		setDesc(collections?.desc?.metaValue);
		// eslint-disable-next-line react-hooks/exhaustive-deps
		
		if(!imageId) return;
		getImageById(imageId).then((response) => {
			collections.addGallery({...response, uuId: uuid()});
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
		if(!imageId && collections.desc.metaValue === desc) {
			galleryStore.callModalError('Вы ничего не изменили');
			return;
		}
		const galleryIdsArray = [];
		collections.gallery.map((el) => galleryIdsArray.push(el.id));
		await saveBlockGallery(galleryIdsArray.join("+"))
			.catch((error) => {
				galleryStore.callModalError('Что то пошло не так ', error.message);
			});
		
		await saveBlockDesc(desc)
			.then(() => {
				collections.setDesc({...collections.desc, metaValue: desc});
			})
			.catch((error) => {
				galleryStore.callModalError('Что то пошло не так ', error.message);
			});
		galleryStore.callModalSuccess("Блок успешно сохранен");
	};
	
	const removeItem = async (e) => {
		const arrayImages = collections.removeImageGallery(e.currentTarget.dataset.id);
		const imageIds = [];
		// eslint-disable-next-line
		arrayImages.map(img => {
			imageIds.push(img.id);
		});
		await saveBlockGallery(imageIds.join("+"))
			.catch((error) => {
				galleryStore.callModalError('Что-то пошло не так ', error?.message);
			});
		
		collections.setUpdate(!collections.update);
	};
	
	return (
		<>
			<Form noValidate validated={validate} onSubmit={saveSettings} className="d-flex flex-column">
				<Form.Group>
					<Form.Label>Описание</Form.Label>
					<Form.Control
						as="textarea"
						value={desc}
						onChange={(e) => setDesc(e.target.value.replace(/\n/g, "<br />"))}
						style={{height: "250px"}}
						required
					/>
				</Form.Group>
				
				{collections.gallery ? (
					<div className={cl.galleryHolder}>
						{collections.gallery.map((el) => {
							const file_path_thumbnail = createFilePath(el.file_name, el.file_ext, 'thumbnail');
							return (
								<Card
									key={el.id}
									className="h-100 justify-content-between p-2"
								>
									<Card.Img
										variant="top"
										height="100px"
										className="object-fit-scale"
										src={file_path_thumbnail}
										alt={el.file_name}
										id={el.id}/>
									<Card.Body className="p-1">
										<Button
											className="w-100"
											data-id={el.id}
											onClick={removeItem}
										>
											Удалить</Button>
									</Card.Body>
								</Card>
							)
						})}
						<Button onClick={() => setModal(true)} variant="outline-primary" className="p-1">
							<CiSquarePlus size={40}/>
						</Button>
					</div>
				) : (
					<h2 className={cl.notFound}>Добавьте первое изображение</h2>
				)}
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

export default Collections;
