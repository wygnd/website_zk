import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import cl from './Footer.module.css';
import { ContextMain } from '../..';
import ModalGallery from '../AdminComponents/ModalGallery/ModalGallery';

const Footer = observer(() => {

    const { galleryStore } = useContext(ContextMain);


    return (
        <>
            <div id={cl.footer} onClick={() => galleryStore.setModal(true)}>
                <div className="container">
                    <div className={cl.footerHolder}>
                        <a href='/' className={cl.privacyLink} >Политика конфиденциальности</a>
                    </div>
                </div>

            </div>
            <ModalGallery
                open={galleryStore.modal}
                clickHandler={() => galleryStore.setModal(false)}
                getImageId={(id) => galleryStore.setImageId(id)}
            ></ModalGallery>
        </>
    );
});

export default Footer;