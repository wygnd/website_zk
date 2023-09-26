import React from 'react';
import Modal from '../../Modal/Modal';
import cl from './ModalSuccess.module.css';
import { CiCircleCheck } from 'react-icons/ci';

const ModalSuccess = ({ isSuccess, clickHandlerModalSuccess, children }) => {
    return (
        <Modal open={isSuccess} clickHandler={() => clickHandlerModalSuccess()}>
            <div className={cl.modalSuccessIcon}>
                <CiCircleCheck color='green' size="60px" />
            </div>
            <div className={cl.modalSuccessTitle}>{children}</div>
        </Modal>
    );
};

export default ModalSuccess;