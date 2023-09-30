import React, { useContext, useMemo, useState } from 'react';
import cl from './CreateSocItem.module.css';
import { observer } from 'mobx-react-lite';
import { ContextMain } from '../../..';
import Button from '../../Button';
import { BiImageAlt } from 'react-icons/bi';
import Input from '../../Input/Input';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import ModalGallery from '../ModalGallery/ModalGallery';
import { getImageById } from '../../../http/galleryAPI';
import { SERVER_URL } from '../../../utils/consts';
import { addSocial } from '../../../http/basicAPI';
import ModalSuccess from '../ModalSuccess/ModalSuccess';
import ModalError from '../ModalError/ModalError';

const CreateSocItem = observer(() => {

    const { basicStore } = useContext(ContextMain);
    const [imagePreview, setImagePreview] = useState();
    const [modalGallery, setModalGallery] = useState(false);
    const [imageId, setImageId] = useState();
    const [linkValue, setLinkValue] = useState('');
    const [messageModal, setMessageModal] = useState('');
    const [modalSucc, setModalSucc] = useState(false);
    const [modalError, setModalError] = useState(false);

    const closeModalGallery = () => {
        setModalGallery(false);
    }

    useMemo(() => {
        if (!imageId) return;
        getImageById(imageId)
            .then(data => {
                console.log(data);
                setImagePreview(data.fileName);
            })
    }, [imageId])

    const createSoc = async () => {
        if (!linkValue) {
            setModalError(true);
            setMessageModal('Ссылка пустая');
            setTimeout(() => {
                setModalError(false);
            }, 2000);
            return;
        }
        if (!imageId) {
            setModalError(true);
            setMessageModal('Изображение не выбрано');
            setTimeout(() => {
                setModalError(false);
            }, 2000);
            return;
        }
        await addSocial(linkValue, imageId)
            .then(data => {
                basicStore.setUpdate(!basicStore.update);
                setImagePreview();
                setLinkValue('');
                setMessageModal('Соц. сеть добавлена успешно')
                setModalSucc(true);
                setTimeout(() => {
                    setModalSucc(false);
                }, 2000);
            })
    }

    const closeModalError = () => {
        setModalError(false);
    }

    return (
        <div className={cl.createSocItem}>
            {imagePreview &&
                <div className={cl.imagePreview}>
                    <img src={`${SERVER_URL}/${imagePreview}`} />
                </div>
            }
            <Button
                onClick={() => setModalGallery(true)}
                svg
            >
                {<BiImageAlt size={20} />}
            </Button>
            <Input placeholder="Ссылка" value={linkValue} onChange={(e) => setLinkValue(e.target.value)} />
            <Button svg invert onClick={createSoc}>
                <BsFillPlusCircleFill />
            </Button>
            <ModalGallery
                open={modalGallery}
                clickHandler={closeModalGallery}
                setOpen={setModalGallery}
                getImageId={(id) => setImageId(id)}
            />
            <ModalSuccess
                isSuccess={modalSucc}
                clickHandlerModalSuccess={setModalSucc}
            >{messageModal}</ModalSuccess>
            <ModalError
                isError={modalError}
                clickCloseModal={closeModalError}
            >
                {messageModal}
            </ModalError>
        </div >
    );
});

export default CreateSocItem;