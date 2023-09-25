import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import cl from './ModalGallery.module.css';
import { SERVER_URL } from '../../../utils/consts';
import { observer } from 'mobx-react-lite';
import { ContextMain } from '../../..';
import { addImage, fetchImages } from '../../../http/galleryAPI';
import Modal from '../../Modal/Modal';
import $ from 'jquery';

const ModalGallery = observer(({ open, clickHandler, setOpen, title = 'Галерея', getImageId }) => {

    const { galleryStore } = useContext(ContextMain);
    const fetchData = async () => {
        return fetchImages();
    }

    useMemo(() => {
        fetchData().then(response => {
            galleryStore.setImages(response.rows);
        });
    }, [open, galleryStore.update]);

    async function inputChangeHandler(e) {
        const formData = new FormData()
        formData.append('fileName', e.target.files[0])
        await addImage(formData).then(data => {
            setOpen(false);
            galleryStore.setUpdate(!galleryStore.update);
        });
    }

    function selectImage(e) {
        getImageId(e.target.dataset.id);
        setOpen(false);
    }

    return (
        <Modal open={open} clickHandler={() => clickHandler()} className={cl.modal}>
            <div className={cl.modalTop}>
                <h4 className={cl.modalTitle}>{title}</h4>
                <label className={cl.input_file}>
                    <input type="file" name="file" onChange={inputChangeHandler} />
                    <div>Новое изображение</div>
                </label>
            </div>
            <div className={cl.galleryHolder}>
                {galleryStore.gallery.map(el =>
                    <div key={el.id} className={cl.galleryItem} onClick={selectImage}>
                        <img data-id={el.id} src={`${SERVER_URL}/${el.fileName}`} />
                    </div>
                )}
            </div>
        </Modal>
    );
});

export default ModalGallery;