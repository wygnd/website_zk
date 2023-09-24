import React, { useContext, useState } from 'react';
import classes from './LogoInput.module.css';
import { observer } from 'mobx-react-lite';
import { ContextMain } from '../../..';
import Button from '../../Button';
import { fetchImages } from '../../../http/galleryAPI';
import ModalGallery from '../ModalGallery/ModalGallery';

const LogoInput = observer(() => {

    const { galleryStore } = useContext(ContextMain);
    const [open, setOpen] = useState(false);

    const buttonClickHandler = async () => {
        setOpen(true);
    
    }

    const clickHandler = () => {
        setOpen(false);
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
                <ModalGallery open={open} clickHandler={clickHandler} setOpen={setOpen} title="Выберите логотип" getImageId={(id) => console.log(id)}/>
            </div>
        </div>
    );
});

export default LogoInput;