import { observer } from 'mobx-react-lite';
import React, { useContext, useMemo, useState } from 'react';
import { ContextMain } from '../../..';
import cl from './PhonesHolder.module.css';
import Input from '../../Input/Input';
import Button from '../../Button';
import { addPhone, changePhone, fetchPhones, removePhone } from '../../../http/basicAPI';
import { BsFillTrashFill } from 'react-icons/bs';
import { FaPen } from 'react-icons/fa';
import Modal from '../../Modal/Modal';

const PhonesHolder = observer(() => {

    const { basicStore, galleryStore } = useContext(ContextMain);
    const [value, setValue] = useState('');
    const [isCorrect, setCorrect] = useState(false);
    const [modal, setOpenModal] = useState(false);
    const [phoneValue, setPhoneValue] = useState('');
    const [phoneKey, setPhoneKey] = useState('');
    const [errorValue, setErrorValue] = useState(false);

    const clickButtonToAddPhone = async (e) => {
        if (value === '') {
            setCorrect(true);
            galleryStore.setModalErr(true);
            galleryStore.setModalMsg('Неправильно указан номер');
            setTimeout(() => {
                galleryStore.setModalErr(false);
                setCorrect(false);
            }, 3000);
            return;
        } else {
            await addPhone(value)
                .then(data => {
                    basicStore.setUpdate(!basicStore.update);
                    setValue('');
                    galleryStore.setModalSucc(true);
                    galleryStore.setModalMsg('Номер успешно удален');
                    setTimeout(() => {
                        galleryStore.setModalSucc(false);
                    }, 3000);
                })
        }
    }

    const deletePhone = async (event) => {
        try {
            const metaKey = event.currentTarget.dataset.key;
            await removePhone(metaKey)
                .then(data => {
                    basicStore.setUpdate(!basicStore.update);
                    galleryStore.setModalSucc(true);
                    galleryStore.setModalMsg('Номер успешно удален');
                    setTimeout(() => {
                        galleryStore.setModalSucc(false);
                    }, 3000);

                })
        } catch (error) {
            galleryStore.setModalErr(true);
            console.log(error);
            galleryStore.setModalMsg(error.message);
            setTimeout(() => {
                galleryStore.setModalErr(false);
            }, 3000);
        }
    }

    const openChangePhoneModal = (e) => {
        setOpenModal(true);
        setPhoneValue(basicStore.getPhone(e.currentTarget.dataset.id)[0].metaValue);
        setPhoneKey(basicStore.getPhone(e.currentTarget.dataset.id)[0].metaKey);
    }

    const saveChangedPhone = async () => {
        try {
            if (phoneValue === '') {
                setErrorValue(true);
                setTimeout(() => {
                    setErrorValue(false);
                }, 2000);
                return;
            } else {
                await changePhone(phoneKey, phoneValue)
                    .then(data => {
                        basicStore.setUpdate(!basicStore.update);
                        setPhoneValue('');
                        setOpenModal(false);
                        galleryStore.setModalSucc(true);
                        galleryStore.setModalMsg('Номер успешно изменен');
                        setTimeout(() => {
                            galleryStore.setModalSucc(false);
                        }, 3000);
                    })
            }
        } catch (error) {
            galleryStore.setModalErr(true);
            console.log(error);
            galleryStore.setModalMsg(error.message);
            setTimeout(() => {
                galleryStore.setModalErr(false);
            }, 3000);
        }

    }

    const closeModal = () => {
        setOpenModal(false);
    }

    return (
        <div className={cl.phonesHolder}>
            {basicStore.phones.length === 0
                ?
                <h4 className={cl.errorTitleNotFoundPhones}>Телефонов не найдено</h4>
                :
                < div className={cl.phonesWrapper}>
                    {basicStore.phones.map(p =>
                        <div key={p.metaKey} className={cl.phoneItemHolder}>
                            <div className={cl.phoneItem}>{p.metaValue}</div>
                            <div className={cl.itemEdit}>
                                <FaPen
                                    size={25}
                                    className={cl.changePhone}
                                    data-id={p.id}
                                    data-key={p.metaKey}
                                    data-value={p.metaValue}
                                    onClick={openChangePhoneModal}
                                />
                                <BsFillTrashFill
                                    onClick={deletePhone}
                                    size={25}
                                    className={cl.deletePhone}
                                    data-id={p.id}
                                    data-key={p.metaKey}
                                    data-value={p.metaValue}
                                />
                            </div>
                        </div>
                    )}
                </div>
            }
            <div className={cl.phonesChanged}>
                <Input
                    mask
                    type="text"
                    placeholder="+7 (___) ___-__-__"
                    value={value}
                    onChange={(e) => setValue(e.target.value)} />
                <Button onClick={clickButtonToAddPhone} error={isCorrect}>Добавить</Button>

                <Modal open={modal} clickHandler={closeModal} >
                    <h4 className={cl.modalChangePhone}>Изменить телефон</h4>
                    <div className={cl.modalChangeHolder}>
                        <Input
                            mask
                            placeholder={phoneValue}
                            onChange={(e) => setPhoneValue(e.target.value)}
                            error={errorValue}
                        />
                        <Button onClick={saveChangedPhone}>Сохранить</Button>
                    </div>
                </Modal>
            </div>
        </div >
    );
});

export default PhonesHolder;