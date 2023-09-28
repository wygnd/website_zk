import React from 'react';
import cl from './Basic.module.css';
import LogoInput from '../LogoInput/LogoInput';
import PhonesHolder from '../../PhonesHolder/PhonesHolder';
import { observer } from 'mobx-react-lite';

const Basic = observer(({ className }) => {
    return (
        <div className={[cl.basicHolder, className].join(' ')}>
            <h2 className={cl.titleHolder}>Основные настройки</h2>
            <div className={cl.basicWrapper}>
                <LogoInput />
                <PhonesHolder />
                
            </div>
        </div>
    );
});

export default Basic;