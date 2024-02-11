import React, {useContext, useMemo, useState} from 'react';
import {ContextMain} from '../../..';
import cl from './Gallery.module.scss';
import {observer} from 'mobx-react-lite';
import {addGalleryItem, removeGalleryItem} from '../../../http/galleryBlockAPI';
import ModalGallery from '../ModalGallery/ModalGallery';
import {createFilePath, getImageById} from '../../../http/galleryAPI';
import {CiSquarePlus} from "react-icons/ci";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Gallery = observer(({className}) => {

	const {galleryBlock, galleryStore} = useContext(ContextMain);
	const [modal, setModal] = useState(false);
	const [imageId, setImageId] = useState();

	useMemo(() => {
		if(!imageId) return;
		getImageById(imageId)
			.then(res => {
				addGalleryItem(imageId)
					.then(() => {
						galleryBlock.setGallery([...galleryBlock.images, res]);
					})
					.catch(err => {
						galleryStore.setModalErr(true);
						galleryStore.setModalMsg(err.message);
						setTimeout(() => {
							galleryStore.setModalErr(false);
						}, 2000);
					})
			})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [imageId])

	const removeItem = async (e) => {
		await removeGalleryItem(e.currentTarget.dataset.id)
			.then(() => {
				setImageId(null);
				galleryBlock.setGallery([]);
				galleryBlock.setUpdate(!galleryBlock.update);
			})
			.catch(err => {
				galleryStore.setModalErr(true);
				galleryStore.setModalMsg(err.message);
				setTimeout(() => {
					galleryStore.setModalErr(false);
				}, 2000);
			})
	}

	return (
		<div className={className}>
			{galleryBlock.images.length === 0 &&
				<h2 className={cl.notFound}>Ничего не найдено</h2>
			}
			<div className={cl.blockHolder}>
				{galleryBlock.images.length !== 0 &&
					galleryBlock.images.map(el => {
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
						}
					)
				}
				<Button onClick={() => setModal(true)} variant="outline-primary" className="p-1">
					<CiSquarePlus size={40}/>
				</Button>
			</div>
			<ModalGallery
				open={modal}
				clickHandler={() => setModal(false)}
				setOpen={() => setModal(false)}
				getImageId={id => setImageId(id)}
			/>
		</div>
	);
});

export default Gallery;