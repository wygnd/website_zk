import React from 'react';
import cl from './Modal.module.scss';
import { observer } from 'mobx-react-lite';

const Modal = observer(({ open, clickHandler, children, overflowY }) => {

    return (
        <>
            <div className={[cl.modalOverView, open && cl.openModal].join(' ')} onClick={() => clickHandler()}></div>
            <div className={[cl.modalContent, open && cl.contentVisible, overflowY && cl.overflowY].join(' ')}>
                {children}
            </div>
        </>
    );
});

export default Modal;