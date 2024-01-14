import React, { useContext, useEffect, useState } from 'react';
import cl from './CreateTour.module.scss';
import { FaArrowDown } from 'react-icons/fa'
import Input from '../../../Input/Input';
import ModalGallery from '../../ModalGallery/ModalGallery';
import { SERVER_URL } from '../../../../utils/consts';
import { getImageById } from '../../../../http/galleryAPI';
import Button from '../../../Button';
import { createTour } from '../../../../http/toursAPI';
import ModalSuccess from '../../ModalSuccess/ModalSuccess';
import ModalError from '../../ModalError/ModalError';
import { observer } from 'mobx-react-lite';
import { ContextMain } from '../../../..';

const CreateTour = observer(() => {

    const { tourStore } = useContext(ContextMain);
    const [acc, setAcc] = useState(false);
    const [name, setName] = useState('');
    const [linkButton, setLinkButton] = useState('');
    const [textButton, setTextButton] = useState('');
    const [galleryId, setGalleryId] = useState();
    const [fileName, setFileName] = useState('');
    const [messageModal, setMessageModal] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [modalSucc, setModalSucc] = useState(false);
    const [modalErr, setModalErr] = useState(false);

    useEffect(() => {
        if (!galleryId) return;
        getImageById(galleryId)
            .then(data => {
                setFileName(data.size);
            })
            .catch(err => console.log(err));
    }, [galleryId])

    const clickHandlerCreateTour = async () => {
        await createTour(name, textButton, linkButton, galleryId)
            .then(data => {
                console.log(data);
                tourStore.setUpdate(!tourStore.update);
                setName('');
                setTextButton('');
                setLinkButton('');
                setFileName('');
                setModalSucc(true)
                setMessageModal('Пост успешно создан')
                setTimeout(() => {
                    setModalSucc(false);
                }, 2000);
            })
    }

    return (
        <div className={cl.createHolder}>
            <div className={[cl.titleHolder, acc && cl.holderActive].join(' ')} onClick={() => setAcc(!acc)}>
                Создать пост
                <FaArrowDown />
            </div>
            <div className={[cl.createBody, acc ? cl.bodyOpen : ''].join(' ')}>
                <Input
                    full
                    placeholder='Название поста'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    full
                    placeholder='Текст кнопки'
                    value={textButton}
                    onChange={(e) => setTextButton(e.target.value)}
                />
                <Input
                    full
                    placeholder='Ссылка кнопки'
                    value={linkButton}
                    onChange={(e) => setLinkButton(e.target.value)}
                />
                {fileName &&
                    <div className={cl.imageChoice}>
                        <img src={`${SERVER_URL}/${fileName.medium}`} alt="" />
                    </div>
                }
                <Button onClick={() => setOpenModal(true)}>Выбрать изображение</Button>
                <Button onClick={clickHandlerCreateTour}>Создать пост</Button>
            </div>
            <ModalGallery
                open={openModal}
                cliclHandler={() => setOpenModal(false)}
                setOpen={setOpenModal}
                getImageId={(id) => setGalleryId(id)}
            />
            <ModalSuccess
                isSuccess={modalSucc}
                clickHandlerModalSuccess={() => setModalSucc(false)}
            >{messageModal}</ModalSuccess>
            <ModalError
                isError={modalErr}
                clickCloseModal={() => setModalErr(false)}
            >{messageModal}</ModalError>
        </div>
    );
});

export default CreateTour;