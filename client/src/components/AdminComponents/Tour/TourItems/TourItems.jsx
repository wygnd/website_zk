import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { ContextMain } from '../../../..';
import TourItem from '../TourItem/TourItem';
import cl from './TourItems.module.scss';
import { FaPen, FaTrash } from 'react-icons/fa';
import ModalSuccess from '../../ModalSuccess/ModalSuccess';
import ModalError from '../../ModalError/ModalError';
import { removeTour } from '../../../../http/toursAPI';
import { useNavigate } from 'react-router-dom';
import { TOUR_BLOCK_ITEM_ROUTE } from '../../../../utils/consts';

const TourItems = observer(() => {

    const { tourStore } = useContext(ContextMain);
    const [modalSucc, setModalSucc] = useState(false);
    const [modalErr, setModalErr] = useState(false);
    const [messageModal, setMessageModal] = useState('');
    const historyItem = useNavigate();

    const removeItem = async (e) => {
        await removeTour(e.currentTarget.dataset.item)
            .then(data => {
                console.log(data);
                tourStore.setUpdate(!tourStore.update);
                setModalSucc(true);
                setMessageModal('Запись успешно удалена')
                setTimeout(() => {
                    setModalSucc(false);
                }, 2000);
            })
            .catch(err => {
                console.log(err);
                setModalErr(true);
                setMessageModal('Что-то пошло не так')
                setTimeout(() => {
                    setModalErr(false);
                }, 2000);
                return;
            })
    }

    return (
        <div className={cl.itemHolder}>
            {tourStore.tours.map(t =>
                <div key={t.id} className={cl.itemWrapper}>
                    <TourItem
                        className={cl.item}
                        name={t.name}
                        textButton={t.textButton}
                        linkButton={t.linkButton}
                        galleryId={t.galleryId}
                    />
                    <div className={cl.changedItems}>
                        <FaPen
                            className={cl.itemChange}
                            onClick={() => historyItem(TOUR_BLOCK_ITEM_ROUTE + '/' + t.id)}
                        />
                        <FaTrash
                            className={cl.itemDelete}
                            data-item={t.id}
                            onClick={removeItem}
                        />
                    </div>
                </div>
            )}
            <ModalSuccess isSuccess={modalSucc} clickHandlerModalSuccess={() => setModalSucc(false)}>
                {messageModal}
            </ModalSuccess>
            <ModalError isError={modalErr} clickCloseModal={() => setModalErr(false)}>
                {messageModal}
            </ModalError>
        </div>
    );
});

export default TourItems;