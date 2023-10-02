import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import cl from './Footer.module.css';
import { ContextMain } from '../..';
import ModalGallery from '../AdminComponents/ModalGallery/ModalGallery';
import ModalError from '../AdminComponents/ModalError/ModalError';
import ModalSuccess from '../AdminComponents/ModalSuccess/ModalSuccess';

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
            <ModalError
                isError={galleryStore.modalErr} clickCloseModal={() => galleryStore.setModalErr(false)}
            >{galleryStore.messageModal}</ModalError>
            <ModalSuccess
            isSuccess={galleryStore.modalSucc} 
            clickHandlerModalSuccess={() => galleryStore.setModalSucc(false)}
            >
                {galleryStore.messageModal}
            </ModalSuccess>
        </>
    );
});

export default Footer;