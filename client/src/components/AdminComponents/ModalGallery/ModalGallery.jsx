import React, { useContext, useEffect, useMemo, useState } from 'react';
import cl from './ModalGallery.module.css';
import { SERVER_URL } from '../../../utils/consts';
import { observer } from 'mobx-react-lite';
import { ContextMain } from '../../..';
import { addImage, fetchImages, removeImageByID } from '../../../http/galleryAPI';
import Modal from '../../Modal/Modal';
import { BsFillTrashFill } from 'react-icons/bs'
import Button from '../../Button';

const ModalGallery = observer(({ open, clickHandler, setOpen, title = 'Галерея', getImageId }) => {

    const { galleryStore } = useContext(ContextMain);

    useMemo(() => {
        fetchImages(1, galleryStore.limit)
            .then(response => {
                galleryStore.setImages(response.rows);
                galleryStore.setTotalCount(response.count);
            });
    }, [open, galleryStore.update]);

    useEffect(() => {
        if (galleryStore.page === 1) return;
        fetchImages(galleryStore.page, galleryStore.limit)
            .then(response => {
                galleryStore.setImages([...galleryStore.gallery, ...response.rows]);
                galleryStore.setTotalCount(response.count);
            });
    }, [galleryStore.page])

    async function inputChangeHandler(e) {
        const formData = new FormData()
        formData.append('fileName', e.target.files[0])
        await addImage(formData).then(data => {
            console.log(data);
            galleryStore.setUpdate(!galleryStore.update);
        });
    }

    function selectImage(e) {
        getImageId(e.target.children[0].dataset.id);
        galleryStore.setModal(false);
    }

    const deleteItem = async (e) => {
        try {
            e.stopPropagation();
            await removeImageByID(e.currentTarget.dataset.id).then(data => {
                galleryStore.setUpdate(!galleryStore.update);
                galleryStore.setModal(false);
            })

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Modal open={galleryStore.modal} clickHandler={() => clickHandler()} className={cl.modal}>
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
                        <div className={cl.hoverHolder}>
                            <BsFillTrashFill
                                color='red' size="35"
                                className={cl.deleteItem}
                                onClick={deleteItem}
                                data-id={el.id}
                            />
                        </div>
                    </div>
                )}
            </div>
            {galleryStore.totalCount > 12 &&
                <div className={cl.moreImages}>
                    <div className={cl.countLoadedImages}>
                        Загружено {galleryStore.loaded} из {galleryStore.totalCount}
                    </div>
                    <Button onClick={() => {
                        galleryStore.setPage(galleryStore.page + 1)
                        // galleryStore.setLoaded(galleryStore.loaded + galleryStore.limit);
                    }}>Загрузить еще</Button>
                </div>
            }
        </Modal>
    );
});

export default ModalGallery;