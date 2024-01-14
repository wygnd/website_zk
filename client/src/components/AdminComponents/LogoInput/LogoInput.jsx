import React, { useContext, useMemo, useState } from 'react';
import classes from './LogoInput.module.scss';
import { observer } from 'mobx-react-lite';
import { ContextMain } from '../../..';
import Button from '../../Button';
import ModalGallery from '../ModalGallery/ModalGallery';
import { setItem } from '../../../http/basicAPI';
import { SERVER_URL } from '../../../utils/consts';

const LogoInput = observer(() => {

    const { basicStore } = useContext(ContextMain);
    const [imageId, setImageId] = useState();
    const [modalGallery, setModalGallery] = useState(false);

    useMemo(() => {
        if (!imageId) return;
        setItem('logo', imageId).then(dataImage => {
            basicStore.setLogo(dataImage);
            basicStore.setUpdate(!basicStore.update);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageId]);

    return (
        <>
            <div className={classes.logoHolder} >
                <div className={classes.inputFile}>
                    {basicStore?.logo?.medium &&
                        <img
                            src={`${SERVER_URL}/${basicStore?.logo?.thumbnail}`}
                            className={classes.logoItem} 
                            alt={`${SERVER_URL}/${basicStore?.logo?.fileName}`}
                            />
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