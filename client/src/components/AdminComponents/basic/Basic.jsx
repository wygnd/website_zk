import React from 'react';
import cl from './Basic.module.css';
import LogoInput from '../LogoInput/LogoInput';
import PhonesHolder from '../../PhonesHolder/PhonesHolder';

const Basic = () => {
    return (
        <div className={cl.basicHolder}>
            <LogoInput />
            <PhonesHolder />
        </div>
    );
};

export default Basic;