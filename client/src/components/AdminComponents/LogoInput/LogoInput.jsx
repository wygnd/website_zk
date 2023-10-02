import React, { useContext, useEffect, useMemo, useState } from 'react';
import classes from './LogoInput.module.css';
import { observer } from 'mobx-react-lite';
import { ContextMain } from '../../..';
import Button from '../../Button';
import ModalGallery from '../ModalGallery/ModalGallery';
import { fetchLogo, setLogo } from '../../../http/basicAPI';
import { SERVER_URL } from '../../../utils/consts';
import { getImageById } from '../../../http/galleryAPI';

const LogoInput = observer(() => {

    const { basicStore, galleryStore } = useContext(ContextMain);
    const [imageId, setImageId] = useState();
    const [modalGallery, setModalGallery] = useState(false);

    useMemo(() => {
        getImageById(imageId).then(data => {
            if (!data) return;
            setLogo(imageId).then(dataImage => {
                basicStore.setLogo(dataImage);
                basicStore.setUpdate(!basicStore.update);
            })
        })
    }, [imageId]);

    return (
        <>
            <div className={classes.logoHolder} >
                <div className={classes.inputFile}>
                    <img
                        src={`${SERVER_URL}/${basicStore?.logo?.metaValue}`}
                        className={classes.logoItem} />
                    <Button onClick={() => setModalGallery(true)}>Выбрать логотип</Button>
                </div>
            </div>
            <ModalGallery
                open={modalGallery}
                clickHandler={() => setModalGallery(false)}
                setOpen={() => setModalGallery(false)}
                getImageId={(id) => setImageId(id)}
            />
        </>
    );
});

export default LogoInput;