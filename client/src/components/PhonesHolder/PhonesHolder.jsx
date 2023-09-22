import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { ContextMain } from '../..';
import cl from './PhonesHolder.module.css';
import Input from '../Input/Input';
import Button from '../Button';
import { fetchImages } from '../../http/galleryAPI';
import { API_URL, SERVER_URL } from '../../utils/consts';

const PhonesHolder = observer(() => {

    const { basicStore, galleryStore } = useContext(ContextMain);

    // useEffect(() => {
    //     fetchImages().then(data => {
    //         console.log(data.data.rows);
    //         galleryStore.setImages(data.data.rows)
    //     })
    // }, [])

    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const [isCorrect, setCorrect] = useState(false);

    const clickHandler = () => {
        if (name === '' || value === '') {
            setCorrect(true);
            setTimeout(() => {
                setCorrect(false);
            }, 3000);
        } else {
            basicStore.addPhone({
                id: Date.now() + Math.random(),
                value,
                name,
            })
        }
    }

    return (
        <div className={cl.phonesHolder}>
            <div className={cl.phonesWrapper}>
                {basicStore.phones.map(p =>
                    <a key={p.id} href={`tel:${p.value}`} className={cl.phoneItem}>{p.value}</a>
                )}
            </div>
            <div className={cl.phonesChanged}>
                <Input
                    type="text"
                    placeholder="Название"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                <Input
                    type="text"
                    placeholder="+7 (___) ___-__-__"
                    value={value}
                    onChange={(e) => setValue(e.target.value)} />
                <Button onClick={clickHandler} error={isCorrect}>Добавить телефон</Button>
            </div>
        </div>
    );
});

export default PhonesHolder;