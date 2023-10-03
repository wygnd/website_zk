import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { changeTour, fetchOneTour } from '../../../http/toursAPI';
import cl from './TourItem.module.css';
import Input from '../../../components/Input/Input';
import { getImageById } from '../../../http/galleryAPI';
import { SERVER_URL } from '../../../utils/consts';
import Fancybox from '../../../components/Fancybox';
import Button from '../../../components/Button';
import ModalGallery from '../../../components/AdminComponents/ModalGallery/ModalGallery';
import { observer } from 'mobx-react-lite';
import { ContextMain } from '../../..';

const TourItem = observer(() => {

    const { galleryStore, tourStore } = useContext(ContextMain);
    const { id } = useParams();
    const [tourData, setTourData] = useState({});
    const [fileName, setFileName] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState('');
    const [linkButton, setLinkButton] = useState('');
    const [textButton, setTextButton] = useState('');
    const [imageId, setImageId] = useState();

    useEffect(() => {
        fetchOneTour(id)
            .then(data => {
                setTourData(data);
                setName(data.name);
                setLinkButton(data.linkButton);
                setTextButton(data.textButton);
                setImageId(data.galleryId);
            })
    }, [tourStore.update])

    useEffect(() => {
        if (!imageId) return;
        getImageById(imageId)
            .then(dataImage => {
                setFileName(dataImage.fileName);
            })
    }, [imageId]);

    const saveTour = async () => {
        await changeTour(id, name, textButton, linkButton, imageId)
            .then(data => {
                setName('');
                setLinkButton('');
                setTextButton('');
                galleryStore.setModalSucc(true);
                galleryStore.setModalMsg('Экскурсия успешно изменена');
                tourStore.setUpdate(!tourStore.update);
                setTimeout(() => {
                    galleryStore.setModalSucc(false);
                }, 2000);
            })
            .catch(error => {
                galleryStore.setModalMsg(error.message);
                galleryStore.setModalErr(true);
                setTimeout(() => {
                    galleryStore.setModalErr(false);
                }, 2000);
            })
    }

    return (
        <>
            <div className='container'>
                <div className={cl.pageTitle}>Изменить экскурсию</div>
                <div className={cl.itemHolder}>
                    <div className={cl.leftItem}>

                        <Input
                            placeholder={name}
                            full
                            bBorder
                            className={cl.nameItem}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            placeholder={linkButton}
                            full
                            bBorder
                            className={cl.textItem}
                            value={linkButton}
                            onChange={(e) => setLinkButton(e.target.value)}
                        />
                        <Input
                            placeholder={textButton}
                            full
                            bBorder
                            className={cl.textItem}
                            value={textButton}
                            onChange={(e) => setTextButton(e.target.value)}
                        />
                    </div>
                    {fileName &&
                        <div className={cl.imageHolder}>
                            <Fancybox className={cl.imageItem}>
                                <img
                                    src={`${SERVER_URL}/${fileName}`}
                                    data-src={`${SERVER_URL}/${fileName}`}
                                    data-fancybox="tourImage"
                                    alt=""
                                />
                            </Fancybox>
                            <Button
                                className={cl.buttonChoice}
                                onClick={() => setOpenModal(true)}
                            >Выбрать изображение</Button>
                        </div>
                    }
                </div>
                <Button
                    className={cl.buttonSave}
                    invert
                    onClick={saveTour}
                >Сохранить</Button>
            </div>
            <ModalGallery
                open={openModal}
                clickHandler={() => setOpenModal(false)}
                setOpen={() => { setOpenModal(false) }}
                getImageId={(id) => setImageId(id)}
            />
        </>
    );
});

export default TourItem;