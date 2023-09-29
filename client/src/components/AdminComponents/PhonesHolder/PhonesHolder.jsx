import { observer } from 'mobx-react-lite';
import React, { useContext, useMemo, useState } from 'react';
import { ContextMain } from '../../..';
import cl from './PhonesHolder.module.css';
import Input from '../../Input/Input';
import Button from '../../Button';
import { addPhone, changePhone, fetchPhones, removePhone } from '../../../http/basicAPI';
import ModalError from '../../AdminComponents/ModalError/ModalError';
import { BsFillTrashFill } from 'react-icons/bs';
import { FaPen } from 'react-icons/fa';
import ModalSuccess from '../../AdminComponents/ModalSuccess/ModalSuccess';
import Modal from '../../Modal/Modal';

const PhonesHolder = observer(() => {

    const { basicStore } = useContext(ContextMain);
    const [value, setValue] = useState('');
    const [isCorrect, setCorrect] = useState(false);
    const [messageModal, setMessage] = useState('');
    const [successModal, setModal] = useState(false);
    const [modal, setOpenModal] = useState(false);
    const [phoneValue, setPhoneValue] = useState('');
    const [phoneKey, setPhoneKey] = useState('');

    useMemo(() => {
        fetchPhones().then(data => {
            basicStore.setPhones(data);
        })
    }, [basicStore.update])

    const clickButtonToAddPhone = async (e) => {
        if (value === '') {
            setCorrect(true);
            setMessage('Неправильно указан номер');
            setTimeout(() => {
                setCorrect(false);
            }, 3000);
            return;
        } else {
            await addPhone(value)
                .then(data => {
                    basicStore.setUpdate(!basicStore.update);
                    setValue('');
                    setModal(true);
                    setMessage('Номер успешно создан');
                    setTimeout(() => {
                        setModal(false);
                    }, 3000);
                })
        }
    }

    const clickCLoseModal = () => {
        setCorrect(false);
    }

    const deletePhone = async (event) => {
        try {
            const metaKey = event.currentTarget.dataset.key;
            await removePhone(metaKey)
                .then(data => {
                    basicStore.setUpdate(!basicStore.update);
                    setModal(true);
                    setMessage('Номер успешно удален');
                    setTimeout(() => {
                        setModal(false);
                    }, 3000);

                })
        } catch (error) {
            setCorrect(true);
            console.log(error);
            setMessage(error.message);
            setTimeout(() => {
                setCorrect(false);
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
                setCorrect(true);
                setMessage('Неправильно указан номер');
                setTimeout(() => {
                    setCorrect(false);
                }, 3000);
                return;
            } else {
                await changePhone(phoneKey, phoneValue)
                    .then(data => {
                        basicStore.setUpdate(!basicStore.update);
                        setPhoneValue('');
                        setOpenModal(false);
                        setModal(true);
                        setMessage('Номер успешно удален');
                        setTimeout(() => {
                            setModal(false);
                        }, 2000);
                    })
            }
        } catch (error) {
            setCorrect(true);
            console.log(error);
            setMessage(error.message);
            setTimeout(() => {
                setCorrect(false);
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
                    )}
                </div>
            }
            <div className={cl.phonesChanged}>
                <Input
                    mask
                    type="text"
                    placeholder="+7 (___) ___-__-__"
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                        console.log(value);
                    }} />
                <Button onClick={clickButtonToAddPhone} error={isCorrect}>Добавить</Button>
                <ModalError isError={isCorrect} clickCloseModal={clickCLoseModal}>{messageModal}</ModalError>
                <ModalSuccess isSuccess={successModal} clickHandlerModalSuccess={() => setModal(false)}>{messageModal}</ModalSuccess>
                <Modal open={modal} clickHandler={closeModal} >
                    <h4 className={cl.modalChangePhone}>Изменить телефон</h4>
                    <div className={cl.modalChangeHolder}>
                        <Input
                            mask
                            placeholder={phoneValue}
                            onChange={(e) => setPhoneValue(e.target.value)}
                        />
                        <Button onClick={saveChangedPhone}>Сохранить</Button>
                    </div>
                </Modal>
            </div>
        </div >
    );
});

export default PhonesHolder;