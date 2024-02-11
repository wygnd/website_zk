import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {changeTour, fetchOneTour} from "../../../http/toursAPI";
import cl from "./TourItem.module.scss";
import {getImageById} from "../../../http/galleryAPI";
import Button from "react-bootstrap/Button";
import ModalGallery from "../../../components/AdminComponents/ModalGallery/ModalGallery";
import {observer} from "mobx-react-lite";
import {ContextMain} from "../../..";
import Container from '../../../components/Container/Container';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Figure from "react-bootstrap/Figure";
import Fancybox from "../../../components/Fancybox";


const TourItem = observer(() => {
	const {galleryStore, tourStore} = useContext(ContextMain);
	const {id} = useParams();
	// const [tourData, setTourData] = useState({});
	const [file, setFile] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const [name, setName] = useState("");
	const [linkButton, setLinkButton] = useState("");
	const [textButton, setTextButton] = useState("");
	const [imageId, setImageId] = useState(null);
	const [validated, setValidated] = useState(false);
	const history = useNavigate();

	useEffect(() => {
		fetchOneTour(id).then((data) => {
			// setTourData(data);
			setName(data.tour_name);
			setLinkButton(data.linkButton);
			setTextButton(data.textButton);
			setImageId(data.galleryId);
		});
	}, [id, tourStore.update]);

	useEffect(() => {
		if(!imageId) return;
		getImageById(imageId).then((dataImage) => {
			setFile(dataImage);
		});
	}, [imageId, tourStore.update]);

	const saveTour = async (event) => {
		const form = event.currentTarget;
		event.preventDefault();
		event.stopPropagation();
		if(!form.checkValidity()) {
			setValidated(true);
			return;
		}
		if(!imageId) {
			galleryStore.setModalErr(true);
			galleryStore.setModalMsg("Пожалуйста, выберите изображение");
			setTimeout(() => {
				galleryStore.setModalErr(false);
			}, 3000)
			return;
		}
		await changeTour(id, name, textButton, linkButton, imageId)
			.then((data) => {
				console.log(data);
				setName("");
				setLinkButton("");
				setTextButton("");
				setFile(null);
				galleryStore.setModalSucc(true);
				galleryStore.setModalMsg("Экскурсия успешно изменена");
				tourStore.setUpdate(!tourStore.update);
				setTimeout(() => {
					galleryStore.setModalSucc(false);
				}, 2000);
			})
			.catch((error) => {
				galleryStore.setModalMsg(error.message);
				galleryStore.setModalErr(true);
				setTimeout(() => {
					galleryStore.setModalErr(false);
				}, 2000);
			});
	};

	return (
		<main>
			<Container>
				<div className={cl.title_holder}>
					<h1 className={cl.itemTitle}>Изменить тур</h1>
					<Button variant="outline-primary" onClick={() => history(-1)}>вернуться назад</Button>
				</div>
				{/*<div className={cl.itemHolder}>*/}
				{/*	<div className={cl.leftItem}>*/}
				{/*		<Input*/}
				{/*			placeholder={name}*/}
				{/*			full*/}
				{/*			bBorder*/}
				{/*			className={cl.nameItem}*/}
				{/*			value={name}*/}
				{/*			onChange={(e) => setName(e.target.value)}*/}
				{/*		/>*/}
				{/*		<Input*/}
				{/*			placeholder={linkButton}*/}
				{/*			full*/}
				{/*			bBorder*/}
				{/*			className={cl.textItem}*/}
				{/*			value={linkButton}*/}
				{/*			onChange={(e) => setLinkButton(e.target.value)}*/}
				{/*		/>*/}
				{/*		<Input*/}
				{/*			placeholder={textButton}*/}
				{/*			full*/}
				{/*			bBorder*/}
				{/*			className={cl.textItem}*/}
				{/*			value={textButton}*/}
				{/*			onChange={(e) => setTextButton(e.target.value)}*/}
				{/*		/>*/}
				{/*	</div>*/}
				{/*	{fileName && (*/}
				{/*		<div className={cl.imageHolder}>*/}
				{/*			<Fancybox className={cl.imageItem}>*/}
				{/*				<img*/}
				{/*					src={`${SERVER_URL}/${fileName.medium}`}*/}
				{/*					data-src={`${SERVER_URL}/${fileName.full}`}*/}
				{/*					data-fancybox="tourImage"*/}
				{/*					alt=""*/}
				{/*				/>*/}
				{/*			</Fancybox>*/}
				{/*			<Button*/}
				{/*				className={cl.buttonChoice}*/}
				{/*				onClick={() => setOpenModal(true)}*/}
				{/*			>*/}
				{/*				Выбрать изображение*/}
				{/*			</Button>*/}
				{/*		</div>*/}
				{/*	)}*/}
				{/*</div>*/}
				<Form
					onSubmit={saveTour}
					noValidate
					validated={validated}
					className="d-flex flex-column"
				>
					<Form.Group controlId="tour-title" className="mb-4">
						<Form.Label>Название</Form.Label>
						<Form.Control
							placeholder={name || "Название тура"}
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</Form.Group>
					<Row className="mb-4">
						<Form.Group controlId="tour-button-text" className="w-50">
							<Form.Label>Кнопка</Form.Label>
							<Form.Control
								value={textButton}
								onChange={(e) => setTextButton(e.target.value)}
								autoComplete="text-button"
								required
							/>
						</Form.Group>
						<Form.Group controlId="tour-button-text" className="w-50">
							<Form.Label>Сслыка</Form.Label>
							<Form.Control
								value={linkButton}
								onChange={(e) => setLinkButton(e.target.value)}
								autoComplete="tour-link"
								required
							/>
						</Form.Group>
					</Row>
					<Fancybox
						options={{
							Carousel: {
								infinite: false,
							},
						}}
						className="mx-auto mb-4"
					>
						<Figure className="d-flex flex-column-reverse align-items-center mb-0 gap-2">
							<a
								href={`${
									file?.file_path
										? file?.file_path
										: "/assets/images/placeholder.png"
								}`}
								data-fancybox="post-image">
								<Figure.Image
									width={320}
									height={320}
									className="mb-0"
									alt={file?.file_name || "post-image"}
									src={`${
										file?.file_path
											? file?.file_path
											: "/assets/images/placeholder.png"
									}`}
								/>
							</a>
							<Button variant="secondary" onClick={() => setOpenModal(true)}>
								Выбрать изображение
							</Button>
						</Figure>
					</Fancybox>
					<Button variant="success" type="submit" className="w-25 mx-auto">
						Сохранить
					</Button>
				</Form>
			</Container>
			<ModalGallery
				open={openModal}
				clickHandler={() => setOpenModal(false)}
				setOpen={() => {
					setOpenModal(false);
				}}
				getImageId={(id) => setImageId(id)}
			/>
		</main>
	);
});

export default TourItem;
