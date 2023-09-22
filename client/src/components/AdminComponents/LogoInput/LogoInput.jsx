import React, { useContext, useState } from 'react';
import classes from './LogoInput.module.css';
import { observer } from 'mobx-react-lite';
import { ContextMain } from '../../..';
import Button from '../../Button';
import Modal from '../../Modal/Modal';
import { addImage, fetchImages } from '../../../http/galleryAPI';
import { SERVER_URL } from '../../../utils/consts';

const LogoInput = observer(() => {

    const { galleryStore } = useContext(ContextMain);
    const [open, setOpen] = useState(false);
    const [logo, setLogo] = useState(null);

    const buttonClickHandler = async () => {
        setOpen(true);
        const response = await fetchImages();
        galleryStore.setImages(response.data.rows);
    }

    const clickHandler = () => {
        setOpen(false);
    }

    async function inputChangeHandler(e) {
        const formData = new FormData()
        formData.append('fileName', e.target.files[0])
        await addImage(formData).then(data => setOpen(false));
    }

    const setLogoHandler = (fileName) => {
        galleryStore.setLogo({src: fileName})
    }

    return (
        <div className={classes.logoHolder} >
            <div className={classes.logoTitle}>Выберите логотип</div>
            <div className={classes.inputFile}>
                <img
                    src={galleryStore.getLogo.src}
                    name={galleryStore.getLogo.fileName}
                    className={classes.logoItem} />
                <Button onClick={buttonClickHandler}>Выбрать логотип</Button>
                <Modal open={open} clickHandler={clickHandler} className={classes.modal}>
                    <div className={classes.modalTop}>
                        <h4 className={classes.modalTitle}>Выберите логотип</h4>
                        <label className={classes.input_file}>
                            <input type="file" name="file" onChange={inputChangeHandler} />
                            <div>Новое изображение</div>
                        </label>
                    </div>
                    <div className={classes.galleryHolder}>
                        {galleryStore.gallery.map(el =>
                            <div key={el.id} className={classes.galleryItem} onClick={() => setLogoHandler(`${SERVER_URL}/${el.fileName}`)}>
                                <img src={`${SERVER_URL}/${el.fileName}`} />
                            </div>
                        )}
                    </div>
                </Modal>
            </div>
        </div>
    );
});

export default LogoInput;