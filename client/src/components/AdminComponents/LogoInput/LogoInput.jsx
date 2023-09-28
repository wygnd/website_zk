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

    const { basicStore } = useContext(ContextMain);
    const [open, setOpen] = useState(false);
    const [imageId, setImageId] = useState();

    useMemo(() => {
        getImageById(imageId).then(data => {
            if (!data) return;
            setLogo(imageId).then(dataImage => {
                basicStore.setLogo(dataImage);
                basicStore.setUpdate(!basicStore.update);
            })
        })
    }, [imageId]);

    const buttonClickHandler = async () => {
        setOpen(true);

    }

    const clickHandler = () => {
        setOpen(false);
    }

    return (
        <div className={classes.logoHolder} >
            <div className={classes.inputFile}>
                <img
                    src={`${SERVER_URL}/${basicStore.logo.metaValue}`}
                    className={classes.logoItem} />
                <Button onClick={buttonClickHandler}>Выбрать логотип</Button>
                <ModalGallery open={open} clickHandler={clickHandler} setOpen={setOpen} title="Выберите логотип" getImageId={(id) => {
                    console.log('get id from modal ' + id);
                    setImageId(id)
                }} />
            </div>
        </div>
    );
});

export default LogoInput;