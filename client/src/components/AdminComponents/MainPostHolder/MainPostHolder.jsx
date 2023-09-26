import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import cl from './MainPostHolder.module.css';
import { ContextMain } from '../../..';
import MainItemPreview from '../MainItemPreview/MainItemPreview';
import { FaPen } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { removeSlide } from '../../../http/mainBlockAPI';
import ModalSuccess from '../ModalSuccess/ModalSuccess';
import { MAIN_BLOCK_ITEM_ROUTE } from '../../../utils/consts';
import { useNavigate } from 'react-router-dom';

const MainPostHolder = observer(() => {

    const { mainBlockStore } = useContext(ContextMain);
    const [successDelete, setSuccessDelete] = useState(false);
    const historyItem = useNavigate();
    const removeitem = async (e) => {
        await removeSlide(e.target.dataset.item)
            .then(data => {
                setSuccessDelete(true);
                mainBlockStore.setUpdate(!mainBlockStore.update);
                setTimeout(() => {
                    setSuccessDelete(false);
                }, 2000);
            })
            .catch(error => console.log(error))
    }

    const cliclHandlerCloseSuccessModal = () => {
        setSuccessDelete(false);
    }

    return (
        <div className={cl.mainPrevWiewHolder}>
            {mainBlockStore.slides.map(el =>
                <div key={el.id} className={cl.mainPreviewItem}>
                    <MainItemPreview
                        id={el.id}
                        title={el.title}
                        desc={el.desc}
                        buttonVisible={el.buttonVisible}
                        textButton={el.textButton}
                        linkButton={el.linkButton}
                        galleryId={el.galleryId} />
                    <div className={cl.items}>
                        <FaPen className={cl.itemChange} onClick={() => historyItem(MAIN_BLOCK_ITEM_ROUTE + '/' + el.id)} />
                        <FaTrash
                            className={cl.itemDelete}
                            onClick={removeitem}
                            data-item={el.id} />
                    </div>
                </div>
            )}
            <ModalSuccess
                isSuccess={successDelete}
                clickHandlerModalSuccess={cliclHandlerCloseSuccessModal}
            >Пост успешно удален</ModalSuccess>
        </div>
    );
});

export default MainPostHolder;