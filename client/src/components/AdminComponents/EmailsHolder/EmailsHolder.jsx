import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import cl from './EmailsHolder.module.css';
import { ContextMain } from '../../..';
import { FaPen, FaTrash } from 'react-icons/fa';
import Modal from '../../Modal/Modal';
import Input from '../../Input/Input';
import Button from '../../Button';
import { createItem, setItem, removeItem } from '../../../http/basicAPI';

const EmailsHolder = observer(() => {

    const { basicStore, galleryStore } = useContext(ContextMain);
    const [modal, setModal] = useState(false);
    const [changedValue, setChangedValue] = useState('');
    const [stockValue, setStockValue] = useState('');
    const [keyItem, setKeyItem] = useState('');
    const [newEmail, setNewEmail] = useState('');

    const saveItem = async () => {
        if (stockValue === changedValue) {
            galleryStore.setModalErr(true);
            galleryStore.setModalMsg('Вы ничего не изменили');
            setTimeout(() => {
                galleryStore.setModalErr(false);
            }, 2000);
            return;
        }
        await setItem(keyItem, changedValue)
            .then(data => {
                setModal(false);
                basicStore.setUpdate(!basicStore.update);
                galleryStore.setModalSucc(true);
                galleryStore.setModalMsg('Почта успешно изменена');
                setTimeout(() => {
                    galleryStore.setModalSucc(false);
                }, 2000);
            })
            .catch(err => {
                setModal(false);
                basicStore.setUpdate(!basicStore.update);
                galleryStore.setModalErr(true);
                galleryStore.setModalMsg('Что-то пошло не так ' + err.message);
                setTimeout(() => {
                    galleryStore.setModalErr(false);
                }, 2000);
            })
    }

    const addNewEmail = async () => {
        if (!newEmail) {
            galleryStore.setModalErr(true);
            galleryStore.setModalMsg('Поле пустое');
            setTimeout(() => {
                galleryStore.setModalErr(false);
            }, 2000);
            return;
        }
        await createItem('email', newEmail)
            .then(data => {
                setModal(false);
                setNewEmail('');
                basicStore.setUpdate(!basicStore.update);
                galleryStore.setModalSucc(true);
                galleryStore.setModalMsg('Почта успешно добавлена');
                setTimeout(() => {
                    galleryStore.setModalSucc(false);
                }, 2000);
            })
            .catch(err => {
                setModal(false);
                basicStore.setUpdate(!basicStore.update);
                galleryStore.setModalErr(true);
                galleryStore.setModalMsg('Что-то пошло не так ' + err.message);
                setTimeout(() => {
                    galleryStore.setModalErr(false);
                }, 2000);
            })
    }

    const removeItemHandler = async (e) => {
        await removeItem(e.currentTarget.dataset.key)
            .then(data => {
                console.log(data);
                setModal(false);
                basicStore.setUpdate(!basicStore.update);
                galleryStore.setModalSucc(true);
                galleryStore.setModalMsg('Почта успешно удалена');
                setTimeout(() => {
                    galleryStore.setModalSucc(false);
                }, 2000);
            })
            .catch(err => {
                setModal(false);
                basicStore.setUpdate(!basicStore.update);
                galleryStore.setModalErr(true);
                galleryStore.setModalMsg('Что-то пошло не так ' + err.message);
                setTimeout(() => {
                    galleryStore.setModalErr(false);
                }, 2000);
            })
    }

    return (
        <div className={cl.emailsHolder}>
            <div className={cl.emailsName}>Электронная почта</div>
            {basicStore.emails
                ?
                <div className={cl.emailsWrapper}>
                    {basicStore.emails.map(el =>
                        <div key={el.id} className={cl.emailItem}>
                            <div className={cl.valueItem}>{el.metaValue}</div>
                            <div className={cl.changeHolderItem}>
                                <FaPen
                                    className={cl.itemChange}
                                    size={25}
                                    data-key={el.metaKey}
                                    data-value={el.metaValue}
                                    data-id={el.id}
                                    onClick={(e) => {
                                        setKeyItem(e.currentTarget.dataset.key);
                                        setStockValue(e.currentTarget.dataset.value);
                                        setChangedValue(e.currentTarget.dataset.value);
                                        setModal(true);
                                    }}
                                />
                                <FaTrash
                                    className={cl.itemDelete}
                                    data-id={el.id}
                                    size={25}
                                    data-key={el.metaKey}
                                    data-value={el.metaValue}
                                    onClick={removeItemHandler}
                                />
                            </div>
                        </div>
                    )}
                </div>
                :
                <div className={cl.notFound}>Записей нет</div>
            }
            <div className={cl.addEmailHolder}>
                <Input
                    placeholder="Email"
                    onChange={e => setNewEmail(e.target.value)}
                />
                <Button onClick={addNewEmail}>Добавить</Button>
            </div>
            <Modal
                open={modal}
                clickHandler={() => setModal(false)}
            >
                <div className={cl.modalHolder}>
                    <Input type="text" value={changedValue} onChange={e => setChangedValue(e.target.value)} />
                    <Button onClick={saveItem}>Сохранить</Button>
                </div>
            </Modal>
        </div>
    );
});

export default EmailsHolder;