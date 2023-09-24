import React, { useState } from 'react';
import cl from './CreateMainBlockPost.module.css';
import { SERVER_URL } from '../../../utils/consts';
import Button from '../../Button';
import ModalGallery from '../ModalGallery/ModalGallery';
import Input from '../../Input/Input';
import Textarea from '../../Textarea/Textarea';
import { observer } from 'mobx-react-lite';
import { getImageById } from '../../../http/galleryAPI';
import { createSlide } from '../../../http/mainBlockAPI';
import Modal from '../../Modal/Modal';
import { CiCircleCheck } from 'react-icons/ci';


const CreateMainBlockPost = observer(() => {

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [buttonVisible, setbuttonVisible] = useState(false);
    const [textButton, setTextButton] = useState('');
    const [linkButton, setLinkButton] = useState('');
    const [galleryId, setGalleryId] = useState(0);
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState('');
    const [isCreatedSucces, setIsCreatedSucces] = useState(false);

    const clickHandlerImage = () => {
        setOpen(false);
    }

    const selectHandler = async (id) => {
        const dataImage = await getImageById(id);
        setImage(dataImage.fileName);
        setGalleryId(id);
    }

    const addPost = async () => {
        if (!title) {
            return alert('Заголовок поста пустой')
        }
        await createSlide(title, desc, buttonVisible, textButton, linkButton, galleryId).then(data => {
            setIsCreatedSucces(true);
            setTimeout(() => {
                setIsCreatedSucces(false);
            }, 3000);
        })
    }

    const clickHandlerModalSuccess = () => {
        setIsCreatedSucces(false);
    }


    return (
        <>
            <div className={cl.mainEdit}>
                <div className={cl.editTitle}>Создать пост</div>
                <div className={cl.mainEditHolder}>
                    <Input type="text" placeholder="Заголовок" full value={title} onChange={(e) => setTitle(e.target.value)} />
                    <Textarea placeholder="Описание" full value={desc} onChange={(e) => setDesc(e.target.value)} />
                    <div className={cl.checkLabel} >
                        <Input id="buttonVisible" type="checkbox" value={buttonVisible} onChange={() => setbuttonVisible(!buttonVisible)} />
                        <label htmlFor="buttonVisible">Кнопка</label>
                    </div>
                    {buttonVisible &&
                        <>
                            <Input placeholder="Текст кнопки" value={textButton} onChange={(e) => setTextButton(e.target.value)} />
                            <Input placeholder="Ссылка кнопки" value={linkButton} onChange={(e) => setLinkButton(e.target.value)} />
                        </>
                    }
                    {image &&
                        <div className={cl.imageHolder}>
                            <img src={`${SERVER_URL}/${image}`} alt={image} />
                        </div>
                    }

                    <Button onClick={() => setOpen(true)}>Выбрать изображение</Button>
                    <ModalGallery open={open} setOpen={setOpen} clickHandler={clickHandlerImage} title="Выбрать изображение" getImageId={selectHandler} />
                </div>
                <Button className={cl.buttonAdd} onClick={addPost}>Создать</Button>
            </div>
            <Modal open={isCreatedSucces} clickHandler={clickHandlerModalSuccess}>
                <div className={cl.modalSuccessIcon}>
                    <CiCircleCheck color='green' size="60px"/>
                </div>
                <div className={cl.modalSuccessTitle}>Пост успешно создан</div>
            </Modal>
        </>
    );
});

export default CreateMainBlockPost;