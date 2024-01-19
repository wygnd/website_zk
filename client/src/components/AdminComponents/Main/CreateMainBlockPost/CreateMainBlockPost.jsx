import React, { useContext, useState } from "react";
import cl from "./CreateMainBlockPost.module.scss";
import { SERVER_URL } from "../../../../utils/consts";
// import Button from "../../../Button";
import ModalGallery from "../../ModalGallery/ModalGallery";
import { observer } from "mobx-react-lite";
import { getImageById } from "../../../../http/galleryAPI";
import ModalSuccess from "../../ModalSuccess/ModalSuccess";
import { ContextMain } from "../../../..";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Figure from "react-bootstrap/Figure";
import { createSlide } from "../../../../http/mainBlockAPI";

const CreateMainBlockPost = observer(() => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [buttonVisible, setbuttonVisible] = useState(false);
  const [textButton, setTextButton] = useState("");
  const [linkButton, setLinkButton] = useState("");
  const [galleryId, setGalleryId] = useState(null);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const [isCreatedSucces, setIsCreatedSucces] = useState(false);
  const { mainBlockStore } = useContext(ContextMain);
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const clickHandlerImage = () => {
    setOpen(false);
  };

  const selectHandler = async (id) => {
    const dataImage = await getImageById(id);
    setImage(dataImage.size);
    setGalleryId(id);
  };

  const addPost = async (event) => {
    try {
      const form = event.currentTarget;
      event.preventDefault();
      event.stopPropagation();
      if (!form.checkValidity()) {
        setValidated(true);
        return;
      }

      setValidated(true);

      if (!galleryId) {
        return alert("Изображение не выбрано");
      }
      await createSlide(
        title,
        desc,
        buttonVisible,
        textButton,
        linkButton,
        galleryId
      ).then((data) => {
        setIsCreatedSucces(true);
        mainBlockStore.setUpdate(!mainBlockStore.update);
        setTitle("");
        setDesc("");
        setbuttonVisible(false);
        setTextButton("");
        setLinkButton("");
        setGalleryId(null);
        setImage("");
        setValidated(false);
        setShow(false);
        setTimeout(() => {
          setIsCreatedSucces(false);
        }, 1500);
      });
    } catch (error) {
      alert(error);
    }
  };

  const clickHandlerModalSuccess = () => {
    setIsCreatedSucces(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="mx-auto px-4">
        Создать пост
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Создать запись</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={addPost}
            className="d-flex flex-column"
          >
            <Form.Group as={Col} controlId="formTitle" className="mb-3">
              <Form.Label>Заголовок</Form.Label>
              <Form.Control
                type="text"
                placeholder="Заголовок"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formDesc" className="mb-4">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                placeholder="Описание"
                as="textarea"
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
              onChange={() => setbuttonVisible(!buttonVisible)}
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
                  <Form.Group
                    as={Col}
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
              <Button variant="secondary" onClick={() => setOpen(true)}>
                Выбрать изображение
              </Button>
            </Figure>
            <Modal.Footer className="p-0 pt-3">
              <Button variant="danger" onClick={handleClose}>
                Закрыть
              </Button>
              <Button variant="success" type="submit">
                Создать
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      <ModalGallery
        open={open}
        setOpen={setOpen}
        clickHandler={clickHandlerImage}
        title="Выбрать изображение"
        getImageId={selectHandler}
      />
      <ModalSuccess
        isSuccess={isCreatedSucces}
        clickHandlerModalSuccess={clickHandlerModalSuccess}
      >
        Пост успешно создан
      </ModalSuccess>
    </>
  );
});

export default CreateMainBlockPost;
