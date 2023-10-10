import React, { useContext, useEffect, useState } from 'react';
import cl from './LastItem.module.css';
import { observer } from 'mobx-react-lite';
import { ContextMain } from '../../../..';
import { getImageById } from '../../../../http/galleryAPI';
import { SERVER_URL } from '../../../../utils/consts';
import { FaPen } from 'react-icons/fa';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { changeOne } from '../../../../http/toursAPI';
import Modal from '../../../Modal/Modal';
import Input from '../../../Input/Input';
import Button from '../../../Button';
import ModalGallery from '../../ModalGallery/ModalGallery';

const LastItem = observer(() => {

    const { tourStore, galleryStore } = useContext(ContextMain);
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [imageId, setImageId] = useState();
    const [image, setImage] = useState('');
    const [modal, setModal] = useState(false);
    const [modalGallery, setModalGallery] = useState(false);

    useEffect(() => {
        setName(tourStore.lastItem.name);
        setLink(tourStore.lastItem.link);
        setImageId(tourStore.lastItem.imageId);
    }, [tourStore.update]);

    useEffect(() => {
        if (!imageId) return;
        getImageById(imageId)
            .then(res => {
                setImage(res?.size);
            })
    }, [imageId]);

    const setVisibleLastItem = async () => {
        await changeOne('lastItemTourVisible', !tourStore.lastItemVisible)
            .then(data => {
                tourStore.setLastItemVisible(!tourStore.lastItemVisible);
            })
        }

    const saveLastItem = async () => {
        if (name == tourStore.lastItem.name && link == tourStore.lastItem.link && imageId == tourStore.lastItem.imageId) {
            setModal(false);
            galleryStore.setModalErr(true);
            galleryStore.setModalMsg('Вы ничего не изменили');
            setTimeout(() => {
                galleryStore.setModalErr(false);
            }, 2000);
            return;
        }
        await changeOne(tourStore.lastItem.metaKey, `${name}+${link}+${imageId}`)
            .then(data => {
                setModal(false);
                galleryStore.setModalSucc(true);
                galleryStore.setModalMsg('Запись успешно изменена');
                tourStore.setUpdateLastItem(!tourStore.updateLastItem);
                setTimeout(() => {
                    galleryStore.setModalSucc(false);
                }, 2000);
            })
            .catch(error => {
                galleryStore.setModalErr(true);
                galleryStore.setModalMsg(error.message);
                setTimeout(() => {
                    galleryStore.setModalErr(false);
                }, 2000);
            })
    }

    return (<>
        <div className={cl.lastItemHolder}>
            <h4 className={cl.titleBlock}>Последний элемент</h4>
            {!tourStore.lastItemVisible &&
                <p className={cl.hiddenText}>Сейчас скрыт</p>
            }
            <div className={cl.lastItemWrapper}>
                <div className={cl.leftItem}>
                    <div className={cl.nameItem}>{name}</div>
                    <div className={cl.linkItem}>{link}</div>
                    {image &&
                        <div className={cl.imageItem}>
                            <img src={`${SERVER_URL}/${image.full}`} alt="" />
                        </div>
                    }
                </div>
                <div className={cl.rightItem}>
                    <FaPen
                        onClick={() => setModal(true)}
                    />
                    {tourStore.lastItemVisible
                        ?
                        <AiFillEye
                            onClick={setVisibleLastItem}
                        />
                        :
                        <AiFillEyeInvisible
                            onClick={setVisibleLastItem}
                        />
                    }
                </div>
            </div>
        </div>
        <Modal
            open={modal}
            clickHandler={() => setModal(false)}
        >
            <div className={cl.modalHolder}>
                <Input
                    placeholder={name}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    full
                />
                <Input
                    placeholder={link}
                    onChange={(e) => setLink(e.target.value)}
                    value={link}
                    full
                />
                <div className={cl.imageHolder}>
                    {image &&
                        <div className={cl.imageItem}>
                            <img src={`${SERVER_URL}/${image.full}`} alt="" />
                        </div>
                    }
                    <Button invert onClick={() => setModalGallery(true)}>Выбрать иконку</Button>
                </div>
                <Button onClick={saveLastItem}>Сохранить</Button>
            </div>
        </Modal>
        <ModalGallery
            open={modalGallery}
            clickHandler={() => setModalGallery(false)}
            setOpen={() => setModalGallery(false)}
            getImageId={(id) => setImageId(id)}
        />
    </>
    );
});

export default LastItem;