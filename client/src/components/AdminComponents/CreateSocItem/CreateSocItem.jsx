import React, { useContext, useMemo, useState } from 'react';
import cl from './CreateSocItem.module.scss';
import { observer } from 'mobx-react-lite';
import { ContextMain } from '../../..';
import Button from '../../Button';
import { BiImageAlt } from 'react-icons/bi';
import Input from '../../Input/Input';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import ModalGallery from '../ModalGallery/ModalGallery';
import { getImageById } from '../../../http/galleryAPI';
import { SERVER_URL } from '../../../utils/consts';
import { createItem } from '../../../http/basicAPI';

const CreateSocItem = observer(() => {

    const { basicStore, galleryStore } = useContext(ContextMain);
    const [imagePreview, setImagePreview] = useState();
    const [modalGallery, setModalGallery] = useState(false);
    const [imageId, setImageId] = useState();
    const [linkValue, setLinkValue] = useState('');

    const closeModalGallery = () => {
        setModalGallery(false);
    }

    useMemo(() => {
        if (!imageId) return;
        getImageById(imageId)
            .then(data => {
                setImagePreview(data.size);
            })
    }, [imageId])

    const createSoc = async () => {
        if (!linkValue) {
            galleryStore.setModalErr(true);
            galleryStore.setModalMsg('Ссылка пустая');
            setTimeout(() => {
                galleryStore.setModalErr(false);
            }, 2000);
            return;
        }
        if (!imageId) {
            galleryStore.setModalErr(true);
            galleryStore.setModalMsg('Изображение не выбрано');
            setTimeout(() => {
                galleryStore.setModalErr(false);
            }, 2000);
            return;
        }
        await createItem('soc', `${linkValue}+${imageId}`)
            .then(data => {
                basicStore.setUpdate(!basicStore.update);
                setImagePreview();
                setLinkValue('');
                galleryStore.setModalMsg('Соц. сеть добавлена успешно');
                galleryStore.setModalSucc(true);
                setTimeout(() => {
                    galleryStore.setModalSucc(false);
                }, 2000);
            })
    }

    return (
        <div className={cl.createSocItem}>
            {imagePreview &&
                <div className={cl.imagePreview}>
                    <img
                        src={`${SERVER_URL}/${imagePreview.full}`}
                        alt={`${SERVER_URL}/${imagePreview.fileName}`}
                    />
                </div>
            }
            <Button svg onClick={() => setModalGallery(true)} className={cl.Button}>
                {<BiImageAlt size={20} />}
            </Button>
            <Input placeholder="Ссылка" value={linkValue} onChange={(e) => setLinkValue(e.target.value)} className={cl.input} />
            <Button svg invert onClick={createSoc} className={cl.createButton}>
                <BsFillPlusCircleFill />
            </Button>
            <ModalGallery
                open={modalGallery}
                clickHandler={closeModalGallery}
                setOpen={setModalGallery}
                getImageId={(id) => setImageId(id)}
            />
        </div >
    );
});

export default CreateSocItem;