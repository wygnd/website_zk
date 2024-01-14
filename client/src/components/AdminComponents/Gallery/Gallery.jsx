import React, { useContext, useMemo, useState } from 'react';
import { ContextMain } from '../../..';
import cl from './Gallery.module.scss';
import { SERVER_URL } from '../../../utils/consts';
import { observer } from 'mobx-react-lite';
import { BsFillTrashFill, BsFillPlusSquareFill } from 'react-icons/bs';
import { addGalleryItem, removeGalleryItem } from '../../../http/galleryBlockAPI';
import ModalGallery from '../ModalGallery/ModalGallery';
import { getImageById } from '../../../http/galleryAPI';

const Gallery = observer(({ className }) => {

    const { galleryBlock, galleryStore } = useContext(ContextMain);
    const [modal, setModal] = useState(false);
    const [imageId, setImageId] = useState();

    useMemo(() => {
        if (!imageId) return;
        getImageById(imageId)
            .then(res => {
                addGalleryItem(imageId)
                    .then(data => {
                        galleryBlock.setGallery([...galleryBlock.images, { id: data.id, size: res?.size }]);
                    })
                    .catch(err => {
                        galleryStore.setModalErr(true);
                        galleryStore.setModalMsg(err.message);
                        setTimeout(() => {
                            galleryStore.setModalErr(false);
                        }, 2000);
                    })
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageId])

    const removeItem = async (e) => {
        await removeGalleryItem(e.currentTarget.dataset.id)
            .then(res => {
                setImageId();
                galleryBlock.setGallery([]);
                galleryBlock.setUpdate(!galleryBlock.update);
            })
            .catch(err => {
                galleryStore.setModalErr(true);
                galleryStore.setModalMsg(err.message);
                setTimeout(() => {
                    galleryStore.setModalErr(false);
                }, 2000);
            })
    }

    return (
        <div className={className}>
            <h2 className={cl.titleBlock}>Блок: Галерея</h2>
            {galleryBlock.images.length === 0 &&
                <h2 className={cl.notFound}>Ничего не найдено</h2>
            }
            <div className={cl.blockHolder}>
                {galleryBlock.images.length !== 0 &&
                    galleryBlock.images.map(el =>
                        <div key={el?.id} className={cl.imageItem} >
                            <img
                                src={`${SERVER_URL}/${el?.size?.thumbnail}`}
                                alt={el?.size?.fileName}
                            />
                            <BsFillTrashFill
                                color='red'
                                size={40}
                                className={cl.deleteItem}
                                data-id={el.id}
                                onClick={removeItem}
                            />
                        </div>
                    )
                }
                <BsFillPlusSquareFill size={40} className={cl.addImage} onClick={() => setModal(true)} />
            </div>
            <ModalGallery
                open={modal}
                clickHandler={() => setModal(false)}
                setOpen={() => setModal(false)}
                getImageId={id => setImageId(id)}
            />
        </div>
    );
});

export default Gallery;