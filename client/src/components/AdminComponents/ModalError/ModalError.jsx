import React from 'react';
import Modal from '../../Modal/Modal';
import cl from './ModalError.module.css';
import { BiErrorCircle } from 'react-icons/bi';

const ModalError = ({ isError, clickCloseModal, children }) => {
    return (
        <Modal open={isError} clickHandler={() => clickCloseModal()}>
            <div className={cl.modalErrorIcon}>
                <BiErrorCircle color='red' size="60px" />
            </div>
            <div className={cl.modalErrorTitle}>{children}</div>
        </Modal>
    );
};

export default ModalError;