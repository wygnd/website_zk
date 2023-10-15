import React, { useContext, useEffect, useState } from 'react';
import cl from './SocialItem.module.css';
import { observer } from 'mobx-react-lite';
import { getImageById } from '../../../http/galleryAPI';
import { SERVER_URL } from '../../../utils/consts';
import { BsFillTrashFill } from 'react-icons/bs';
import { FaPen } from 'react-icons/fa';
import { setItem, removeItem } from '../../../http/basicAPI';
import { ContextMain } from '../../..';
import Modal from '../../Modal/Modal';
import Input from '../../Input/Input';
import Button from '../../Button';
import ModalGallery from '../ModalGallery/ModalGallery';

const SocialItem = observer(({ iconId, link, metaKey, ...props }) => {

    const { basicStore, galleryStore } = useContext(ContextMain);
    const [id, setId] = useState(iconId);
    const [icon, setIcon] = useState();
    const [modal, setModal] = useState(false);
    const [itemValue, setItemValue] = useState(link);
    const [modalGallery, setModalGallery] = useState(false);

    useEffect(() => {
        if (!id) return;
        getImageById(id)
            .then(data => {
                setIcon(data?.size);
            });
    }, [basicStore.update, id])



    const removeItemHandler = async () => {
        await removeItem(metaKey)
            .then(data => {
                console.log(data);
                basicStore.setUpdate(!basicStore.update)
                galleryStore.setModalMsg(data.message);
                galleryStore.setModalSucc(true);
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
            });
    }

    const clickSaveItem = async () => {
        await setItem(metaKey, `${itemValue}+${iconId}`)
            .then(data => {
                basicStore.setUpdate(!basicStore.update)
                setModal(false);
                galleryStore.setModalMsg('Соц. сеть успешно изменена');
                galleryStore.setModalSucc(true);
                setTimeout(() => {
                    galleryStore.setModalSucc(false);
                }, 2000);
            })
    }

    return (
        <>
            <div className={cl.socItemHolder}>
                <div className={cl.socItem} >
                    {icon &&
                        <img src={`${SERVER_URL}/${icon.full}`} alt={`${SERVER_URL}/${icon.fileName}`} />
                    }
                    <div className={cl.linkItem}>{link}</div>
                </div>
                <FaPen
                    size={25}
                    className={cl.changeSoc}
                    onClick={() => setModal(true)}
                />
                <BsFillTrashFill
                    size={25}
                    className={cl.deleteSoc}
                    onClick={removeItemHandler}
                />
                <Modal
                    open={modal}
                    clickHandler={() => setModal(false)}
                >
                    <div className={cl.modalHolder}>
                        {icon &&
                            <img
                                src={`${SERVER_URL}/${icon.full}`}
                                onClick={() => setModalGallery(true)}
                                alt={`${SERVER_URL}/${icon.fileName}`}
                            />
                        }
                        <Input
                            placeholder={itemValue}
                            value={itemValue}
                            onChange={(e) => setItemValue(e.target.value)}
                        />
                        <Button onClick={clickSaveItem}>Сохранить</Button>
                    </div>


                </Modal>
            </div>
            <ModalGallery
                open={modalGallery}
                clickHandler={() => setModalGallery(false)}
                setOpen={() => setModalGallery(false)}
                getImageId={(id) => setId(id)}
            />
        </>
    );
});

export default SocialItem;