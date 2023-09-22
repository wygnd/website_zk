import React from 'react';
import cl from './Modal.module.css';

const Modal = ({ open, clickHandler, children }) => {

    return (
        <>
            <div className={[cl.modalOverView, open && cl.openModal].join(' ')} onClick={() => clickHandler()}></div>
            <div className={[cl.modalContent, open && cl.contentVisible].join(' ')}>
                {children}
            </div>
        </>
    );
};

export default Modal;