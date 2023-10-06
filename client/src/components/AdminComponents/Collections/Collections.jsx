import React, { useContext, useEffect, useMemo, useState } from 'react';
import cl from './Collections.module.css';
import { observer } from 'mobx-react-lite';
import { ContextMain } from '../../..';
import Textarea from '../../Textarea/Textarea';
import CollectionsItem from './CollectionsItem/CollectionsItem';
import ModalGallery from '../ModalGallery/ModalGallery';
import { getImageById } from '../../../http/galleryAPI';
import { BsFillPlusSquareFill, BsFillTrashFill } from 'react-icons/bs';
import uuid from 'react-uuid';
import Button from '../../Button';
import { saveBlock, saveBlockDesc, saveBlockGallery } from '../../../http/collectionsAPI';

const Collections = observer(({ className }) => {

    const { collections, galleryStore } = useContext(ContextMain);
    const [desc, setDesc] = useState('');
    const [modal, setModal] = useState(false);
    const [imageId, setImageId] = useState();

    useEffect(() => {
        setDesc(collections.desc);
    }, [])

    useMemo(() => {
        if (!imageId) return;
        getImageById(imageId)
            .then(res => {
                collections.setGallery([...collections.gallery, { imageId: res.id, fileName: res.fileName, uuId: uuid() }])
            })
    }, [imageId])

    const saveSettings = async () => {
        if (!imageId && collections.desc == desc) {
            galleryStore.setModalErr(true);
            galleryStore.setModalMsg('Вы ничего не изменили');
            setTimeout(() => {
                galleryStore.setModalErr(false);
            }, 2000)
            return;
        }
        const galleryIdsArray = [];
        collections.gallery.map(el => {
            galleryIdsArray.push(el.imageId);
        })
        await saveBlockGallery(galleryIdsArray.join('+'))
            .catch(error => {
                galleryStore.setModalErr(true);
                galleryStore.setModalMsg(error.message);
                setTimeout(() => {
                    galleryStore.setModalErr(false);
                }, 2000)
            })

        await saveBlockDesc(desc)
            .catch(error => {
                galleryStore.setModalErr(true);
                galleryStore.setModalMsg(error.message);
                setTimeout(() => {
                    galleryStore.setModalErr(false);
                }, 2000)
            })
        collections.setGallery([]);
        galleryStore.setModalSucc(true);
        galleryStore.setModalMsg('Блок успешно сохранен');
        setTimeout(() => {
            galleryStore.setModalSucc(false);
        }, 2000)
        collections.setUpdate(!collections.update);
    }

    const removeItem = async (e) => {
        const arrayImages = collections.gallery.filter(el => el.uuId !== e.currentTarget.dataset.id)
        let arrayRequest = [];
        arrayImages.map(el => {
            arrayRequest.push(el.imageId);
        })

        await saveBlockGallery(arrayRequest.join('+'))
            .then(data => {
                collections.setGallery([]);
                galleryStore.setModalSucc(true);
                galleryStore.setModalMsg('Изображение удалено');
                setTimeout(() => {
                    galleryStore.setModalSucc(false);
                }, 2000)
            })
            .catch(error => {
                galleryStore.setModalErr(true);
                galleryStore.setModalMsg(error.message);
                setTimeout(() => {
                    galleryStore.setModalErr(false);
                }, 2000)
            })
        collections.setUpdate(!collections.update);
    }

    return (
        <>
            <div className={className}>
                <h2 className={cl.titleBlock}>Блок: {collections.name}</h2>
                <div className={cl.blockHolder}>
                    <Textarea value={desc} onChange={e => setDesc(e.target.value)} full h200 />
                    {collections.gallery
                        ?
                        <div className={cl.galleryHolder}>
                            {collections.gallery.map(el =>
                                <div className={cl.galleryItemHolder} key={el.uuId}>
                                    <CollectionsItem fileName={el.fileName} id={el.imageId} />
                                    <BsFillTrashFill
                                        color='red'
                                        size={40}
                                        className={cl.deleteItem}
                                        data-id={el.uuId}
                                        onClick={removeItem}
                                    />
                                </div>
                            )}
                            <BsFillPlusSquareFill size={40} className={cl.addImage} onClick={() => setModal(true)} />
                        </div>
                        :
                        <h2 className={cl.notFound}>Ничего не найднео</h2>
                    }
                </div>
                <Button onClick={saveSettings} className={cl.btnSave}>Сохранить изменения</Button>
            </div>
            <ModalGallery
                open={modal}
                clickHandler={() => setModal(false)}
                setOpen={() => setModal(false)}
                getImageId={(id) => setImageId(id)}
            />
        </>
    );
});

export default Collections;