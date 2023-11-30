import React from 'react';
import cl from './Modal.module.css';
import { observer } from 'mobx-react-lite';

const Modal = observer(({ open, clickHandler, children, overflowY, className }) => {

    return (
        <>
            <div className={[cl.modalOverView, open && cl.openModal].join(' ')} onClick={() => clickHandler()}></div>
            <div className={[cl.modalContent, open && cl.contentVisible, overflowY && cl.overflowY, className === "modal_gallery" && cl.modalGallery].join(' ')}>
                {children}
            </div>
        </>
    );
});

export default Modal;