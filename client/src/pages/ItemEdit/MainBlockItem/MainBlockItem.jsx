import React, { useContext, useEffect, useState } from "react";
import { fetchOneSlide, saveSlide } from "../../../http/mainBlockAPI";
import { observer } from "mobx-react-lite";
import { ContextMain } from "../../..";
import { useParams } from "react-router-dom";
import cl from "./MainBlockItem.module.scss";
import Input from "../../../components/Input/Input";
import { getImageById } from "../../../http/galleryAPI";
import { SERVER_URL } from "../../../utils/consts";
import Fancybox from "../../../components/Fancybox";
// import Button from "../../../components/Button";
import ModalGallery from "../../../components/AdminComponents/ModalGallery/ModalGallery";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Figure from "react-bootstrap/Figure";

const MainBlockItem = observer(() => {
  const { mainBlockStore, galleryStore } = useContext(ContextMain);
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [buttonVisible, setButtonVisible] = useState(false);
  const [textButton, setTextButton] = useState("");
  const [linkButton, setLinkButton] = useState("");
  const [galleryId, setGalleryId] = useState("");
  const [image, setImage] = useState("");
  const [modalImages, setModalImages] = useState(false);
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(null);

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
        setImage(dataImage?.size)
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getImageId = (id) => {
    getImageById(id).then((data) => {
      setImage(data?.size);
      setGalleryId(data.id);
    });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const closeGalleryModal = () => {
    setModalImages(false);
  };

  const saveItem = async () => {
    if (
      mainBlockStore.slide.title === title &&
      mainBlockStore.slide.desc === desc &&
      mainBlockStore.slide.buttonVisible === buttonVisible &&
      mainBlockStore.slide.textButton === textButton &&
      mainBlockStore.slide.linkButton === linkButton &&
      mainBlockStore.slide.galleryId === galleryId
    ) {
      galleryStore.setModalMsg("Вы ничего не изменили");
      galleryStore.setModalErr(true);
      setTimeout(() => {
        galleryStore.setModalErr(false);
      }, 2000);
      return;
    }
    try {
      // await saveSlide(
      //   id,
      //   title,
      //   desc,
      //   buttonVisible,
      //   textButton,
      //   linkButton,
      //   galleryId
      // ).then((response) => {
      //   mainBlockStore.setUpdate(!mainBlockStore.update);
      //   galleryStore.setModalSucc(true);
      //   galleryStore.setModalMsg("Запись успешно сохранена");
      //   setTimeout(() => {
      //     galleryStore.setModalSucc(false);
      //   }, 2000);
      // });
    } catch (error) {
      galleryStore.setModalMsg(
        "Произошла непредвиденная ошибка " + error.message
      );
      galleryStore.setModalErr(true);
      setTimeout(() => {
        galleryStore.setModalErr(false);
      }, 2000);
    }
  };

  return (
    <main className="container">
      <Form
        noValidate
        validated={validated}
        onSubmit={saveItem}
        className="d-flex flex-column"
      >
        <Form.Group as={Col} controlId="formTitle" className="mb-3">
          <Form.Label>Заголовок</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder={title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formDesc" className="mb-4">
          <Form.Label>Описание</Form.Label>
          <Form.Control
            as="textarea"
            placeholder={desc}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </Form.Group>
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
                as={Col}
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
              <Form.Group as={Col} controlId="formButtonDesc" className="p-0">
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
        <Figure as={Col} className="mx-auto mb-3">
          <Figure.Image
            width={140}
            height={140}
            className="mb-0 me-3"
            alt={image.fileName || "post-image"}
            src={`${
              image.thumbnail
                ? SERVER_URL + "/" + image.thumbnail
                : "/assets/images/placeholder.png"
            }`}
          />
          <Button variant="secondary" onClick={() => setModalImages(true)}>
            Выбрать изображение
          </Button>
        </Figure>
        <Button variant="danger" onClick={handleClose}>
          Закрыть
        </Button>
        <Button variant="success" type="submit">
          Создать
        </Button>
      </Form>
    </main>
  );
});

export default MainBlockItem;
