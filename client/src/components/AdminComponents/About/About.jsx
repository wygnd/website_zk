import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import cl from './About.module.css';
import Textarea from '../../Textarea/Textarea';
import { ContextMain } from '../../..';
import { SERVER_URL } from '../../../utils/consts';
import Button from '../../Button';
import { getImageById } from '../../../http/galleryAPI';
import ModalGallery from '../ModalGallery/ModalGallery';
import { saveBlockDesc, saveBlockGallery } from '../../../http/aboutAPI';

const About = observer(({ className }) => {

    const { about, galleryStore } = useContext(ContextMain);
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState({});
    const [imageId, setImageId] = useState();
    const [modal, setModal] = useState(false);

    useEffect(() => {
        if (!about.desc && !about.image) return;
        setDesc(about.desc);
        setImage(about.image);
        setImageId(about.image.id);
    }, [about.update, about.desc, about.image])

    useMemo(() => {
        if (!imageId) return;
        getImageById(imageId)
            .then(data => {
                setImage({ id: data.id, size: data.size })
            })
    }, [imageId])

    const saveBlock = async () => {
        if (desc == about.desc && imageId == about.image.id) {
            galleryStore.setModalErr(true)
            galleryStore.setModalMsg('Вы ничего не изменили');
            setTimeout(() => {
                galleryStore.setModalErr(false)
            }, 2000);
            return;
        }
        
        await saveBlockDesc(desc)
            .catch(error => {
                galleryStore.setModalErr(true)
                galleryStore.setModalMsg(error.message);
                setTimeout(() => {
                    galleryStore.setModalErr(false)
                }, 2000);
            })
        await saveBlockGallery(imageId)
            .catch(error => {
                galleryStore.setModalErr(true)
                galleryStore.setModalMsg(error.message);
                setTimeout(() => {
                    galleryStore.setModalErr(false)
                }, 2000);
            })
        galleryStore.setModalSucc(true);
        galleryStore.setModalMsg('Блок успешно изменен');
        setTimeout(() => {
            about.setUpdate(!about.update);
            galleryStore.setModalSucc(false);
        }, 2000);
    }

    return (
        <div className={className}>
            <h2 className={cl.titleBlock}>Блок: О проекте</h2>
            <div className={cl.blockHolder}>
                <Textarea
                    placeholder={desc}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className={cl.descBlock}
                    full
                />
                <div className={cl.imageHolder}>
                    {image
                        ?
                        <div className={cl.image}>
                            <img src={`${SERVER_URL}/${image?.size?.full}`} alt={image?.size?.fileName} />
                        </div>
                        :
                        <h4 className={cl.notFound}>Изображения не найдено</h4>
                    }
                    <div className={cl.buttons}>
                        <Button invert className={cl.btnImage} onClick={() => setModal(true)}>Выбрать изображение</Button>
                        <Button onClick={saveBlock}>Сохранить</Button>
                    </div>
                </div>
            </div>
            <ModalGallery
                open={modal}
                clickHandler={() => setModal(false)}
                setOpen={() => setModal(false)}
                getImageId={(id) => setImageId(id)}
            />
        </div>
    );
});

export default About;