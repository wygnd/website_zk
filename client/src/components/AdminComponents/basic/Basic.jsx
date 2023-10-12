import React, { useContext, useState } from 'react';
import cl from './Basic.module.css';
import LogoInput from '../LogoInput/LogoInput';
import { observer } from 'mobx-react-lite';
import PhonesHolder from '../PhonesHolder/PhonesHolder';
import SocialsHolder from '../SocialsHolder/SocialsHolder';
import { ContextMain } from '../../..';
import Input from '../../Input/Input';
import Button from '../../Button';
import { setItem } from '../../../http/basicAPI';

const Basic = observer(({ className }) => {

    const { contactsStore, galleryStore } = useContext(ContextMain);
    const [mapValue, setMapValue] = useState();

    const saveMap = async () => {
        if (!mapValue) {
            galleryStore.setModalErr(true);
            galleryStore.setModalMsg('Пустое поле');
            setTimeout(() => {
                galleryStore.setModalErr(false);
            }, 2000);
            return;
        }

        await setItem('map', `${mapValue.split(',')[0].trim()}+${mapValue.split(',')[1].trim()}`)
            .then(data => {
                galleryStore.setModalSucc(true);
                galleryStore.setModalMsg('Карта успешно сохранена');
                contactsStore.setUpdate(!contactsStore.update);
                setTimeout(() => {
                    galleryStore.setModalSucc(false);
                }, 2000);
            })
    }

    return (
        <div className={[cl.basicHolder, className].join(' ')}>
            <h2 className={cl.titleHolder}>Основные настройки</h2>
            <div className={cl.basicWrapper}>
                <LogoInput />
                <PhonesHolder />
                <SocialsHolder />
                <div className={cl.mapHolder}>
                    <div className={cl.mapName}>Координаты карты</div>
                    <div className={cl.mapWrapper}>
                        <Input placeholder={`${contactsStore.map[0]}, ${contactsStore.map[1]}`} onChange={(e) => setMapValue(e.target.value)} />
                        <Button onClick={saveMap}>Сохранить</Button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Basic;