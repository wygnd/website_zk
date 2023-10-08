import React, { useContext, useEffect, useMemo, useState } from 'react';
import classes from './LogoInput.module.css';
import { observer } from 'mobx-react-lite';
import { ContextMain } from '../../..';
import Button from '../../Button';
import ModalGallery from '../ModalGallery/ModalGallery';
import { setLogo } from '../../../http/basicAPI';
import { SERVER_URL } from '../../../utils/consts';

const LogoInput = observer(() => {

    const { basicStore } = useContext(ContextMain);
    const [imageId, setImageId] = useState();
    const [modalGallery, setModalGallery] = useState(false);

    useMemo(() => {
        if (!imageId) return;
        setLogo(imageId).then(dataImage => {
            console.log(dataImage);
            basicStore.setLogo(dataImage);
            basicStore.setUpdate(!basicStore.update);
        })
    }, [imageId]);

    return (
        <>
            <div className={classes.logoHolder} >
                <div className={classes.inputFile}>
                    {basicStore?.logo?.medium &&
                        <img
                            src={`${SERVER_URL}/${basicStore?.logo?.thumbnail}`}
                            className={classes.logoItem} />
                    }
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