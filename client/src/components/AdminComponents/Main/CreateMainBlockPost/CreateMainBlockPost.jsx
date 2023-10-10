import React, { useContext, useState } from 'react';
import cl from './CreateMainBlockPost.module.css';
import { SERVER_URL } from '../../../../utils/consts';
import Button from '../../../Button';
import ModalGallery from '../../ModalGallery/ModalGallery';
import Input from '../../../Input/Input';
import Textarea from '../../../Textarea/Textarea';
import { observer } from 'mobx-react-lite';
import { getImageById } from '../../../../http/galleryAPI';
import { createSlide } from '../../../../http/mainBlockAPI';
import ModalSuccess from '../../ModalSuccess/ModalSuccess';
import { ContextMain } from '../../../..';
import { FaArrowDown } from 'react-icons/fa'


const CreateMainBlockPost = observer(({ }) => {

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [buttonVisible, setbuttonVisible] = useState(false);
    const [textButton, setTextButton] = useState('');
    const [linkButton, setLinkButton] = useState('');
    const [galleryId, setGalleryId] = useState(1);
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState('');
    const [isCreatedSucces, setIsCreatedSucces] = useState(false);
    const { mainBlockStore } = useContext(ContextMain);
    const [accIsOpen, setAccOpen] = useState(false);


    const clickHandlerImage = () => {
        setOpen(false);
    }

    const selectHandler = async (id) => {
        const dataImage = await getImageById(id);
        setImage(dataImage.size);
        setGalleryId(id);
    }

    const addPost = async () => {
        if (!title) {
            return alert('Заголовок поста пустой')
        }
        await createSlide(title, desc, buttonVisible, textButton, linkButton, galleryId).then(data => {
            setIsCreatedSucces(true);
            mainBlockStore.setUpdate(!mainBlockStore.update);
            setTitle('');
            setDesc('');
            setbuttonVisible(false);
            setTextButton('');
            setLinkButton('');
            setGalleryId(1);
            setImage('');
            setAccOpen(false);
            setTimeout(() => {
                setIsCreatedSucces(false);
            }, 1500);
        })
    }

    const clickHandlerModalSuccess = () => {
        setIsCreatedSucces(false);
    }


    return (
        <>
            <div className={cl.mainEdit}>
                <div
                    className={[cl.editTitle, accIsOpen && cl.editTitleActive].join(' ')}
                    onClick={() => setAccOpen(!accIsOpen)}>
                    Создать пост
                    <FaArrowDown />
                </div>
                <div className={[cl.mainEditHolder, accIsOpen && cl.mainEditHolderOpen].join(' ')}>
                    <Input type="text" placeholder="Заголовок" full value={title} onChange={(e) => setTitle(e.target.value)} />
                    <Textarea placeholder="Описание" full value={desc} onChange={(e) => setDesc(e.target.value)} />
                    <div className={cl.checkLabel} >
                        <Input id="buttonVisible" type="checkbox" checked={buttonVisible} onChange={() => setbuttonVisible(!buttonVisible)} />
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
                            <img src={`${SERVER_URL}/${image.thumbnail}`} alt={image.fileName} />
                        </div>
                    }

                    <Button onClick={() => setOpen(true)}>Выбрать изображение</Button>
                    <ModalGallery open={open} setOpen={setOpen} clickHandler={clickHandlerImage} title="Выбрать изображение" getImageId={selectHandler} />
                    <Button className={cl.buttonAdd} onClick={addPost}>Создать</Button>
                </div>
            </div>
            <ModalSuccess isSuccess={isCreatedSucces} clickHandlerModalSuccess={clickHandlerModalSuccess}>Пост успешно создан</ModalSuccess>
        </>
    );
});

export default CreateMainBlockPost;