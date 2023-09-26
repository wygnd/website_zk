import React, { useContext, useEffect, useMemo, useState } from 'react';
import { fetchOneSlide, saveSlide } from '../../http/mainBlockAPI';
import { observer } from 'mobx-react-lite';
import { ContextMain } from '../..';
import { useParams } from 'react-router-dom';
import cl from './MainBlockItem.module.css';
import Input from '../../components/Input/Input';
import { getImageById } from '../../http/galleryAPI';
import { SERVER_URL } from '../../utils/consts';
import Fancybox from '../../components/Fancybox';
import Button from '../../components/Button';
import ModalError from '../../components/AdminComponents/ModalError/ModalError';
import ModalGallery from '../../components/AdminComponents/ModalGallery/ModalGallery';
import ModalSuccess from '../../components/AdminComponents/ModalSuccess/ModalSuccess';

const MainBlockItem = observer(() => {

    const { mainBlockStore } = useContext(ContextMain);
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [buttonVisible, setButtonVisible] = useState(false);
    const [textButton, setTextButton] = useState('');
    const [linkButton, setLinkButton] = useState('');
    const [galleryId, setGalleryId] = useState('');
    const [image, setImage] = useState('');
    const [modalImages, setModalImages] = useState(false);
    const [modalError, setModalError] = useState(false);
    const [messageModal, setMessageModal] = useState('');
    const [modalSuccessOpen, setModalSucces] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState(false);

    useEffect(() => {
        fetchOneSlide(id).then(data => {
            mainBlockStore.setOneSlide(data);
            setTitle(data.title);
            setDesc(data.desc);
            setButtonVisible(data.buttonVisible);
            setTextButton(data.textButton);
            setLinkButton(data.linkButton);
            setGalleryId(data.galleryId);
            getImageById(data.galleryId).then(dataImage => setImage(dataImage.fileName));
        })
    }, []);


    const getImageId = (id) => {
        getImageById(id).then(data => {
            setImage(data.fileName);
            setGalleryId(data.id)
        });
    }

    const closeModal = () => {
        setModalError(false);
    }

    const closeGalleryModal = () => {
        setModalImages(false);

    }

    const closeModalSuccess = () => {
        setModalSucces(false);
    }

    const saveItem = async () => {
        if (mainBlockStore.slide.title === title &&
            mainBlockStore.slide.desc === desc &&
            mainBlockStore.slide.buttonVisible === buttonVisible &&
            mainBlockStore.slide.textButton === textButton &&
            mainBlockStore.slide.linkButton === linkButton &&
            mainBlockStore.slide.galleryId === galleryId) {
            setMessageModal('Вы ничего не изменили');
            setModalError(true);
            setTimeout(() => {
                setModalError(false);
            }, 2000);
            return;
        }
        try {
            await saveSlide(id, title, desc, buttonVisible, textButton, linkButton, galleryId).then(response => {
                setMessageSuccess('Запись успешно сохранена');
                setModalSucces(true);
                setTimeout(() => {
                    setModalSucces(false);
                }, 2000);
            })
        } catch (error) {
            setModalError(true);
            setMessageModal('Произошла непредвиденная ошибка');
            console.log(error);
            setTimeout(() => {
                setModalError(false);
            }, 2000);
        }
    }

    return (
        <main className='container'>
            <div className={cl.itemHolder}>
                <Input className={cl.itemTitle} placeholder={title} full tBorder value={title} onChange={(e) => setTitle(e.target.value)} />
                <Input className={cl.itemDesc} placeholder={desc} full tBorder value={desc} onChange={(e) => setDesc(e.target.value)} />
                <div className={cl.itemLabel} >
                    <Input id="buttonVisible" type="checkbox" checked={buttonVisible} onChange={() => setButtonVisible(!buttonVisible)} />
                    <label htmlFor="buttonVisible">Кнопка</label>
                </div>
                {buttonVisible &&
                    <>
                        <Input
                            className={cl.itemDesc}
                            placeholder="Текст кнопки"
                            value={textButton}
                            onChange={(e) => setTextButton(e.target.value)}
                        />
                        <Input
                            className={cl.itemDesc}
                            placeholder="Ссылка кнопки"
                            value={linkButton}
                            onChange={(e) => setLinkButton(e.target.value)}
                        />
                    </>
                }
                <Button
                    className={cl.itemButton}
                    onClick={() => setModalImages(true)}
                >
                    Выбрать изображение
                </Button>
                <ModalGallery
                    open={modalImages}
                    clickHandler={closeGalleryModal}
                    setOpen={setModalImages}
                    getImageId={getImageId}
                />
                {image &&
                    <Fancybox>
                        <div className={cl.itemImage}>
                            <img
                                src={`${SERVER_URL}/${image}`}
                                alt={image}
                                data-src={`${SERVER_URL}/${image}`}
                                data-fancybox={`postItem-${id}`}
                            />
                        </div>
                    </Fancybox>
                }
                <Button className={cl.itemButton} onClick={saveItem}>Сохранить</Button>
            </div>
            <ModalSuccess isSuccess={modalSuccessOpen} clickHandlerModalSuccess={closeModalSuccess}>{messageSuccess}</ModalSuccess>
            <ModalError isError={modalError} clickCloseModal={closeModal}>{messageModal}</ModalError>
        </main>
    );
});

export default MainBlockItem;