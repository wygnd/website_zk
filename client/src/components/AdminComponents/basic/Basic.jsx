import React from 'react';
import cl from './Basic.module.css';
import LogoInput from '../LogoInput/LogoInput';
import PhonesHolder from '../PhonesHolder/PhonesHolder';
import SocialsHolder from '../SocialsHolder/SocialsHolder';
import MapHolder from '../MapHolder/MapHolder';
import EmailsHolder from '../EmailsHolder/EmailsHolder';

const Basic = ({ className }) => {

    return (
        <div className={[cl.basicHolder, className].join(' ')}>
            <h2 className={cl.titleHolder}>Основные настройки</h2>
            <div className={cl.basicWrapper}>
                <LogoInput />
                <PhonesHolder />
                <SocialsHolder />
                <EmailsHolder />
                <MapHolder />
            </div>
        </div>
    );
};

export default Basic;