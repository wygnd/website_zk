import React, {useContext, useEffect, useState} from 'react';
import cl from './CreateTour.module.scss';
import ModalGallery from '../../ModalGallery/ModalGallery';
import {getImageById} from '../../../../http/galleryAPI';
import {createTour} from '../../../../http/toursAPI';
import ModalSuccess from '../../ModalSuccess/ModalSuccess';
import {observer} from 'mobx-react-lite';
import {ContextMain} from '../../../..';
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Figure from "react-bootstrap/Figure";

const CreateTour = observer(() => {

  const {tourStore, galleryStore} = useContext(ContextMain);
  // const [acc, setAcc] = useState(false);
  const [name, setName] = useState('');
  const [linkButton, setLinkButton] = useState('');
  const [textButton, setTextButton] = useState('');
  const [galleryId, setGalleryId] = useState(null);
  const [file, setFile] = useState('');
  const [messageModal, setMessageModal] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [modalSucc, setModalSucc] = useState(false);
  // const [modalErr, setModalErr] = useState(false);
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if(!galleryId) return;
    getImageById(galleryId)
      .then(data => {
        setFile(data);
      })
      .catch(err => console.log(err));
  }, [galleryId])

  const submitHandlerCreateTour = async (event) => {
    try {
      const form = event.currentTarget;
      event.preventDefault();
      event.stopPropagation();
      if(!form.checkValidity()) {
        setValidated(true);
        return;
      }
      if(!galleryId) {
        galleryStore.setModalErr(true);
        galleryStore.setModalMsg("Пожалуйста, выберите изображение");
        setTimeout(() => {
          galleryStore.setModalErr(false);
        }, 3000)
        return;
      }
      await createTour(name, textButton, linkButton, galleryId)
        .then(() => {
          tourStore.setUpdate(!tourStore.update);
          setValidated(false);
          setName('');
          setGalleryId(null);
          setTextButton('');
          setLinkButton('');
          setFile(null);
          setShow(false);
          setModalSucc(true)
          setMessageModal('Пост успешно создан')
          setTimeout(() => {
            setModalSucc(false);
          }, 2000);
        })
    } catch(e) {
      galleryStore.setModalErr(true);
      galleryStore.setModalMsg(e);
      setTimeout(() => {
        galleryStore.setModalErr(false);
      }, 3000)
    }
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="mx-auto mt-auto" onClick={handleShow}>Создать запись</Button>
      <Modal show={show} onHide={handleClose} className={cl.createHolder}>
        <Modal.Header closeButton>
          <Modal.Title>Создать тур</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={submitHandlerCreateTour}
            className="d-flex flex-column"
          >
            <Form.Group controlId="tour-title" className="mb-3">
              <Form.Label>Название тура</Form.Label>
              <Form.Control
                type="text"
                placeholder="Название тура"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group controlId="tour-link" className="mb-3">
              <Form.Label>Кнопка</Form.Label>
              <Form.Control
                type="text"
                placeholder="Оставить заявку"
                value={textButton}
                onChange={(e) => setTextButton(e.target.value)}
                required
                autoComplete="tour-button-text"
              />
            </Form.Group>
            <Form.Group controlId="tour-link" className="mb-3">
              <Form.Label>Ссылка</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://example.com"
                value={linkButton}
                onChange={(e) => setLinkButton(e.target.value)}
                required
                autoComplete="tour-link"
              />
            </Form.Group>
            <Figure className="mx-auto mb-3">
              <Figure.Image
                width={140}
                height={140}
                className="mb-0 me-3"
                alt={file?.file_name || "post-image"}
                src={`${
                  file?.file_path
                    ? file?.file_path
                    : "/assets/images/placeholder.png"
                }`}
              />
              <Button variant="secondary" onClick={() => setOpenModal(true)}>
                Выбрать изображение
              </Button>
            </Figure>

            <Button type="submit" variant="success">Создать пост</Button>
          </Form>
        </Modal.Body>
        {/*<div className={[cl.createBody, acc ? cl.bodyOpen : ''].join(' ')}>*/}
        {/*    <Input*/}
        {/*        full*/}
        {/*        placeholder='Название поста'*/}
        {/*        value={name}*/}
        {/*        onChange={(e) => setName(e.target.value)}*/}
        {/*    />*/}
        {/*    <Input*/}
        {/*        full*/}
        {/*        placeholder='Текст кнопки'*/}
        {/*        value={textButton}*/}
        {/*        onChange={(e) => setTextButton(e.target.value)}*/}
        {/*    />*/}
        {/*    <Input*/}
        {/*        full*/}
        {/*        placeholder='Ссылка кнопки'*/}
        {/*        value={linkButton}*/}
        {/*        onChange={(e) => setLinkButton(e.target.value)}*/}
        {/*    />*/}
        {/*    {fileName &&*/}
        {/*        <div className={cl.imageChoice}>*/}
        {/*            <img src={`${SERVER_URL}/${fileName.medium}`} alt="" />*/}
        {/*        </div>*/}
        {/*    }*/}
        {/*</div>*/}
      </Modal>
      <ModalGallery
        open={openModal}
        cliclHandler={() => setOpenModal(false)}
        setOpen={setOpenModal}
        getImageId={(id) => setGalleryId(id)}
      />
      <ModalSuccess
        isSuccess={modalSucc}
        clickHandlerModalSuccess={() => setModalSucc(false)}
      >
        {messageModal}
      </ModalSuccess>
    </>
  );
});

export default CreateTour;