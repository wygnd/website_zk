import React, {useContext, useEffect, useMemo, useState} from "react";
import cl from "./ModalGallery.module.scss";
import {observer} from "mobx-react-lite";
import {ContextMain} from "../../..";
import {
	addImage,
	fetchImages,
	removeImageByID,
} from "../../../http/galleryAPI";
import {BsFillTrashFill} from "react-icons/bs";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalGallery = observer(
	({open, setOpen, title = "Галерея", getImageId}) => {
		
		const {galleryStore, basicStore} = useContext(ContextMain);
		const [images, setImages] = useState([]);
		
		useEffect(() => {
			if(galleryStore.gallery.length !== 0 || !open || galleryStore.page !== 1) return;
			fetchImages(galleryStore.page, galleryStore.limit).then((response) => {
				galleryStore.setImages(response.gallery);
				galleryStore.setTotalCount(response.count);
			});
		}, [open]);
		
		function inputChangeHandler(e) {
			if(e.target.files.length === 0) return;
			const files = e.target.files;
			const formData = new FormData();
			for(const prop in files) {
				formData.append("file", files[prop]);
			}
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
			galleryStore.setLoaded(galleryStore.limit);
			setImages([]);
		}
		
		const deleteItem = async (e) => {
			e.stopPropagation();
			try {
				await removeImageByID(e.currentTarget.dataset.id);
				galleryStore.setUpdate(!galleryStore.update);
			} catch(error) {
				galleryStore.callModalError(`Что-то пошло не так. ${error?.message}`);
			}
		};
		
		const handleCloseModal = () => {
			setOpen(false);
			galleryStore.setPage(1);
			galleryStore.setLoaded(galleryStore.limit);
			galleryStore.setImages([]);
			setImages([]);
		}
		
		const handleNextPageGallery = () => {
			galleryStore.setPage(galleryStore.page + 1);
			fetchImages(galleryStore.page, galleryStore.limit).then((response) => {
				galleryStore.setLoaded(galleryStore.loaded + response.gallery.length);
				setImages([...images, ...response.gallery]);
			});
		}
		
		return (
			<>
				<Modal
					show={open}
					size="xl"
					aria-labelledby="contained-modal-title-vcenter"
					centered
					onHide={handleCloseModal}
				>
					<Modal.Header>
						<Modal.Title id="contained-modal-title-vcenter" className={`${cl.modalTop} w-100`}>
							<h4 className={cl.modalTitle}>{title}</h4>
							<Button as="label" className={cl.input_file}>
								<input type="file" name="file" multiple onChange={inputChangeHandler}/>
								<div>Новое изображение</div>
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
								{galleryStore.loaded < galleryStore.totalCount && (
									<Button
										onClick={handleNextPageGallery}
									>
										Загрузить еще
									</Button>
								)}
							</div>
						)}
						<Button variant="danger" onClick={handleCloseModal}>Закрыть</Button>
					</Modal.Footer>
				</Modal>
			</>
		);
	}
);

export default ModalGallery;
