import React, { useContext, useEffect, useState } from 'react';
import cl from './SocialItem.module.css';
import { observer } from 'mobx-react-lite';
import { getImageById } from '../../../http/galleryAPI';
import { SERVER_URL } from '../../../utils/consts';
import { BsFillTrashFill } from 'react-icons/bs';
import { FaPen } from 'react-icons/fa';
import { changeSocial, removeSocial } from '../../../http/basicAPI';
import { ContextMain } from '../../..';
import ModalSuccess from '../ModalSuccess/ModalSuccess';
import ModalError from '../ModalError/ModalError';
import Modal from '../../Modal/Modal';
import Input from '../../Input/Input';
import Button from '../../Button';

const SocialItem = observer(({ iconId, link, metaKey, ...props }) => {

    const { basicStore } = useContext(ContextMain);
    const [icon, setIcon] = useState();
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [messageModal, setMessageModal] = useState('');
    const [modal, setModal] = useState(false);
    const [itemValue, setItemValue] = useState(link);


    useEffect(() => {
        getImageById(iconId)
            .then(data => {
                setIcon(data.fileName);
            });
    }, [basicStore.update])


    const removeItem = async () => {
        await removeSocial(metaKey)
            .then(data => {
                console.log(data);
                basicStore.setUpdate(!basicStore.update)
                setMessageModal(data.message);
                setOpenSuccess(true);
                setTimeout(() => {
                    setOpenSuccess(false);
                }, 2000);
            })
            // .catch(error => {
            //     setOpenError(true);
            //     setMessageModal(error.message);
            //     setTimeout(() => {
            //         setOpenError(false);
            //     }, 2000);
            // });
        }

    const handlerCloseModal = () => {
        setOpenSuccess(false);
    }

    const clickSaveItem = async () => {
        await changeSocial(metaKey, itemValue, iconId)
            .then(data => {
                console.log(data);
                basicStore.setUpdate(!basicStore.update)
                setModal(false);
                setMessageModal('Соц. сеть успешно изменена');
                setOpenSuccess(true);
                setTimeout(() => {
                    setOpenSuccess(false);
                }, 2000);
            })
    }

    return (
        <div className={cl.socItemHolder}>
            <div className={cl.socItem}>
                <img src={`${SERVER_URL}/${icon}`} alt="" />
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
                onClick={removeItem}
            />
            <ModalSuccess
                isSuccess={openSuccess}
                clickHandlerModalSuccess={handlerCloseModal}
            >{messageModal}</ModalSuccess>
            <ModalError
                isError={openError}
                clickCloseModal={setOpenError}
            >{messageModal}</ModalError>
            <Modal
                open={modal}
                clickHandler={() => setModal(false)}
            >
                <div className={cl.modalHolder}>
                    <img src={`${SERVER_URL}/${icon}`} />
                    <Input
                        placeholder={itemValue}
                        value={itemValue}
                        onChange={(e) => setItemValue(e.target.value)}
                    />
                    <Button onClick={clickSaveItem}>Сохранить</Button>
                </div>


            </Modal>
        </div>
    );
});

export default SocialItem;