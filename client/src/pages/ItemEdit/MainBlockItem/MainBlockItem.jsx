import React, {useContext, useEffect, useState} from "react";
import {fetchOneSlide, saveSlide} from "../../../http/mainBlockAPI";
import {observer} from "mobx-react-lite";
import {ContextMain} from "../../..";
import {useNavigate, useParams} from "react-router-dom";
import cl from "./MainBlockItem.module.scss";
import {getImageById} from "../../../http/galleryAPI";
import ModalGallery from "../../../components/AdminComponents/ModalGallery/ModalGallery";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Figure from "react-bootstrap/Figure";
import Container from "../../../components/Container/Container";
import Fancybox from "../../../components/Fancybox";

const MainBlockItem = observer(() => {
	const {mainBlockStore, galleryStore} = useContext(ContextMain);
	const {id} = useParams();
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [buttonVisible, setButtonVisible] = useState(false);
	const [textButton, setTextButton] = useState("");
	const [linkButton, setLinkButton] = useState("");
	const [galleryId, setGalleryId] = useState("");
	const [image, setImage] = useState("");
	const [modalImages, setModalImages] = useState(false);
	const [validated, setValidated] = useState(false);
	const history = useNavigate();
	
	useEffect(() => {
		fetchOneSlide(id).then((data) => {
			mainBlockStore.setOneSlide(data);
			setTitle(data.title);
			setDesc(data.desc);
			setButtonVisible(data.buttonVisible);
			setTextButton(data.textButton);
			setLinkButton(data.linkButton);
			setGalleryId(data.galleryId);
			getImageById(data.galleryId).then((dataImage) =>
				setImage(dataImage)
			);
		});
	}, []);
	
	const getImageId = (id) => {
		getImageById(id).then((data) => {
			setImage(data?.size);
			setGalleryId(data.id);
		});
	};
	
	const closeGalleryModal = () => {
		setModalImages(false);
	};
	
	const saveItem = async (event) => {
		try {
			event.preventDefault();
			event.stopPropagation();
			setValidated(true);
			
			if(
				mainBlockStore.slide.title === title &&
				mainBlockStore.slide.desc === desc &&
				mainBlockStore.slide.buttonVisible === buttonVisible &&
				mainBlockStore.slide.textButton === textButton &&
				mainBlockStore.slide.linkButton === linkButton &&
				mainBlockStore.slide.galleryId === galleryId
			) {
				galleryStore.callModalError("Вы ничего не изменили");
				return;
			}
			await saveSlide(
				id,
				title,
				desc,
				buttonVisible,
				textButton,
				linkButton,
				galleryId
			).then(() => {
				galleryStore.callModalSuccess("Запись успешно изменена");
				mainBlockStore.setUpdateSlide(!mainBlockStore.updateSlide);
			});
		} catch(error) {
			galleryStore.callModalError("Что-то пошло не так " + error.message);
		}
	};
	
	return (
		<>
			<main className={cl.page_admin__edit}>
				<Container>
					<div className={cl.title_holder}>
						<h1 className={cl.itemTitle}>Изменить запись</h1>
						<Button variant="outline-primary" onClick={() => history(-1)}>вернуться назад</Button>
					</div>
					<Form
						noValidate
						validated={validated}
						onSubmit={saveItem}
						className="d-flex flex-column"
					>
						<Row className="mb-2">
							<Form.Group
								controlId="formTitle"
								className="mb-3"
							>
								<Form.Label>Заголовок</Form.Label>
								<Form.Control
									type="text"
									required
									placeholder={title}
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</Form.Group>
							<Form.Group
								controlId="formDesc"
								className="mb-4"
							>
								<Form.Label>Описание</Form.Label>
								<Form.Control
									as="textarea"
									placeholder={desc}
									value={desc}
									onChange={(e) => setDesc(e.target.value)}
								/>
							</Form.Group>
						</Row>
						<Form.Check
							className="mb-2"
							type="switch"
							id="button-visible"
							label="Кнопка"
							checked={buttonVisible}
							onChange={() => setButtonVisible(!buttonVisible)}
						/>
						{buttonVisible && (
							<Row className="mb-4">
								<Col>
									<Form.Group
										controlId="FormButonText"
										className="p-0"
										required
									>
										<Form.Control
											placeholder="Текст кнопки"
											value={textButton}
											onChange={(e) => setTextButton(e.target.value)}
											required
										/>
									</Form.Group>
								</Col>
								<Col className="ps-0">
									<Form.Group
										controlId="formButtonDesc"
										className="p-0"
									>
										<Form.Control
											required
											placeholder="Ссылка кнопки"
											value={linkButton}
											onChange={(e) => setLinkButton(e.target.value)}
										/>
									</Form.Group>
								</Col>
							</Row>
						)}
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
										image?.file_path
											? image?.file_path
											: "/assets/images/placeholder.png"
									}`}
									data-fancybox="post-image">
									<Figure.Image
										width={320}
										height={320}
										className="mb-0"
										alt={image?.file_name || "post-image"}
										src={`${
											image?.file_path
												? image?.file_path
												: "/assets/images/placeholder.png"
										}`}
									/>
								</a>
								<Button variant="secondary" onClick={() => setModalImages(true)}>
									Выбрать изображение
								</Button>
							</Figure>
						</Fancybox>
						<Button variant="success" type="submit" className="w-25 mx-auto">
							Сохранить
						</Button>
					</Form>
				</Container>
			</main>
			<ModalGallery
				open={modalImages}
				clickHandler={closeGalleryModal}
				setOpen={setModalImages}
				getImageId={getImageId}
			/>
		</>
	);
});

export default MainBlockItem;
