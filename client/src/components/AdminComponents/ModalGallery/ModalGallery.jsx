import React, {useContext, useEffect, useMemo, useState} from "react";
import cl from "./ModalGallery.module.scss";
import {observer} from "mobx-react-lite";
import {ContextMain} from "../../..";
import {
	addImage,
	fetchImages,
	removeImageByID,
} from "../../../http/galleryAPI";
// import Modal from "../../Modal/Modal";
import {BsFillTrashFill} from "react-icons/bs";
// import Button from "../../Button";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalGallery = observer(
	({open, setOpen, title = "Галерея", getImageId}) => {
		const {galleryStore, basicStore} = useContext(ContextMain);
		const [images, setImages] = useState([]);

		useMemo(() => {
			if(!open) return;
			fetchImages(1, galleryStore.limit).then((response) => {
				galleryStore.setImages(response.gallery);
				galleryStore.setTotalCount(response.count);
			});
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [open, galleryStore.update]);

		useEffect(() => {
			if(!open) return;
			if(galleryStore.page === 1) return;
			fetchImages(galleryStore.page, galleryStore.limit).then((response) => {
				galleryStore.setLoaded(galleryStore.loaded + response.gallery.length);
				setImages([...images, ...response.gallery]);
				galleryStore.setTotalCount(response.count);
			});
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [open, galleryStore.page]);

		function inputChangeHandler(e) {
			if(!e.target.files[0]) return;
			const formData = new FormData();
			formData.append("file", e.target.files[0]);
			basicStore.setLoading(true);
			addImage(formData).then(() => {
				galleryStore.setUpdate(!galleryStore.update);
				basicStore.setLoading(false);
			});
		}

		function selectImage(e) {
			getImageId(e.target.children[0].dataset.id);
			setOpen(false);
			galleryStore.setPage(1);
			setImages([]);
		}

		const deleteItem = async (e) => {
			try {
				e.stopPropagation();
				await removeImageByID(e.currentTarget.dataset.id).then((data) => {
					galleryStore.setUpdate(!galleryStore.update);
				});
			} catch(error) {
				galleryStore.setModalErr(true);
				galleryStore.setModalMsg(error.message);
				setTimeout(() => {
					galleryStore.setModalErr(false);
				}, 2000);
			}
		};

		return (
			<>
				<Modal
					show={open}
					size="xl"
					aria-labelledby="contained-modal-title-vcenter"
					centered
					onHide={() => setOpen(false)}
				>
					<Modal.Header>
						<Modal.Title id="contained-modal-title-vcenter" className={`${cl.modalTop} w-100`}>
							<h4 className={cl.modalTitle}>{title}</h4>
							{/*<label className={cl.input_file}>*/}
							{/*  <input type="file" name="file" onChange={inputChangeHandler}/>*/}
							{/*  <div>Новое изображение</div>*/}
							{/*</label>*/}
							<Button>
								<label className={cl.input_file}>
									<input type="file" name="file" onChange={inputChangeHandler}/>
									<div>Новое изображение</div>
								</label>
							</Button>
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className={cl.galleryHolder}>
							{galleryStore.gallery.map((el) => (
								<div key={el.id} className={cl.galleryItem} onClick={selectImage}>
									<img data-id={el.id} src={el?.file_path} alt={el?.file_name} loading="lazy"/>
									<div className={cl.hoverHolder}>
										<BsFillTrashFill
											color="red"
											size="30"
											className={cl.deleteItem}
											onClick={deleteItem}
											data-id={el.id}
										/>
									</div>
								</div>
							))}
							{images &&
								images.map((el) => (
									<div key={el.id} className={cl.galleryItem} onClick={selectImage}>
										<img data-id={el.id} src={el?.file_path} alt={el?.file_name}/>
										<div className={cl.hoverHolder}>
											<BsFillTrashFill
												color="red"
												size="30"
												className={cl.deleteItem}
												onClick={deleteItem}
												data-id={el.id}
											/>
										</div>
									</div>
								))}
						</div>
					</Modal.Body>
					<Modal.Footer>
						{galleryStore.totalCount > 12 && (
							<div className={cl.moreImages}>
								<div className={cl.countLoadedImages}>
									Загружено {galleryStore.loaded} из {galleryStore.totalCount}
								</div>
								{galleryStore.loaded !== galleryStore.totalCount && (
									<Button
										onClick={() => {
											galleryStore.setPage(galleryStore.page + 1);
										}}
									>
										Загрузить еще
									</Button>
								)}
							</div>
						)}
						<Button variant="danger" onClick={() => setOpen(false)}>Закрыть</Button>
					</Modal.Footer>
				</Modal>
			</>
		);
	}
);

export default ModalGallery;
