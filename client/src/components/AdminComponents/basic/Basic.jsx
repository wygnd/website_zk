import React from 'react';
import cl from './Basic.module.css';
import LogoInput from '../LogoInput/LogoInput';
import { observer } from 'mobx-react-lite';
import PhonesHolder from '../PhonesHolder/PhonesHolder';
import SocialsHolder from '../SocialsHolder/SocialsHolder';

const Basic = observer(({ className }) => {
    return (
        <div className={[cl.basicHolder, className].join(' ')}>
            <h2 className={cl.titleHolder}>Основные настройки</h2>
            <div className={cl.basicWrapper}>
                <LogoInput />
                <PhonesHolder />
                <SocialsHolder />
            </div>
        </div>
    );
});

export default Basic;