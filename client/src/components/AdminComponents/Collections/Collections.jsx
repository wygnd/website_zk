import React, {useContext, useEffect, useMemo, useState} from "react";
import cl from "./Collections.module.scss";
import {observer} from "mobx-react-lite";
import {ContextMain} from "../../..";
import Textarea from "../../Textarea/Textarea";
import ModalGallery from "../ModalGallery/ModalGallery";
import {createFilePath, getImageById} from "../../../http/galleryAPI";
import {BsFillPlusSquareFill, BsFillTrashFill} from "react-icons/bs";
import uuid from "react-uuid";
// import Button from "../../Button";
import {saveBlockDesc, saveBlockGallery} from "../../../http/collectionsAPI";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {CiSquarePlus} from "react-icons/ci";
import Form from "react-bootstrap/Form";


const Collections = observer(({className}) => {
	const {collections, galleryStore} = useContext(ContextMain);
	const [desc, setDesc] = useState("");
	const [modal, setModal] = useState(false);
	const [imageId, setImageId] = useState(null);
	const [validate, setValidate] = useState(false);

	useEffect(() => {
		setDesc(collections?.desc?.metaValue);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {

	}, [collections.update])

	useMemo(() => {
		if(!imageId) return;
		getImageById(imageId).then((response) => {
			collections.addGallery({...response, uuId: uuid()});
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
			galleryStore.setModalErr(true);
			galleryStore.setModalMsg("Вы ничего не изменили");
			setTimeout(() => {
				galleryStore.setModalErr(false);
			}, 2000);
			return;
		}
		const galleryIdsArray = [];
		collections.gallery.map((el) => galleryIdsArray.push(el.id));
		await saveBlockGallery(galleryIdsArray.join("+"))
			.catch((error) => {
				galleryStore.setModalErr(true);
				galleryStore.setModalMsg(error.message);
				setTimeout(() => {
					galleryStore.setModalErr(false);
				}, 2000);
			});

		await saveBlockDesc(desc).catch((error) => {
			galleryStore.setModalErr(true);
			galleryStore.setModalMsg(error.message);
			setTimeout(() => {
				galleryStore.setModalErr(false);
			}, 2000);
		});

		collections.setUpdate(!collections.update);
		galleryStore.setModalSucc(true);
		galleryStore.setModalMsg("Блок успешно сохранен");
		setImageId(null);
		setTimeout(() => {
			galleryStore.setModalSucc(false);
		}, 2000);
	};

	const removeItem = async (e) => {
		const arrayImages = collections.removeImageGallery(e.currentTarget.dataset.id);
		const imageIds = [];
		arrayImages.map(img => {
			imageIds.push(img.id);
		});
		await saveBlockGallery(imageIds.join("+"))
			.then(() => {
				galleryStore.setModalSucc(true);
				galleryStore.setModalMsg("Изображение удалено");
				setTimeout(() => {
					galleryStore.setModalSucc(false);
				}, 2000);
			})
			.catch((error) => {
				galleryStore.setModalErr(true);
				galleryStore.setModalMsg(error.message);
				setTimeout(() => {
					galleryStore.setModalErr(false);
				}, 2000);
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
