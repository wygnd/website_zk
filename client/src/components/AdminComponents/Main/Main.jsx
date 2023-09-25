import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import cl from './Main.module.css';
import { ContextMain } from '../../..';
import CreateMainBlockPost from '../CreateMainBlockPost/CreateMainBlockPost';
import Modal from '../../Modal/Modal';
import Button from '../../Button';
import MainPostHolder from '../MainPostHolder/MainPostHolder';

const Main = observer(({ className }) => {

    const { mainBlockStore } = useContext(ContextMain);
    const [openModal, setOpenModal] = useState(false);

    const clickCloseModal = () => {
        setOpenModal(false);
    }

    return (
        <div className={className}>
            <div className={cl.titleBlock}>Главный баннер</div>
            {mainBlockStore.slides.length === 0
                ?
                <div className={cl.notFound}>Записей не найдено</div>
                :
                <MainPostHolder />
            }
            {/* <Button className={cl.btnCreatePost} onClick={() => setOpenModal(true)}>Создать запись</Button> */}
                <CreateMainBlockPost clickButtonCreate={clickCloseModal} />
            {/* <Modal open={openModal} clickHandler={clickCloseModal} >
            </Modal> */}
        </div>
    );
});

export default Main;