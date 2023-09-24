import React from 'react';
import cl from './Basic.module.css';
import LogoInput from '../LogoInput/LogoInput';
import PhonesHolder from '../../PhonesHolder/PhonesHolder';

const Basic = ({className}) => {
    return (
        <div className={[cl.basicHolder, className].join(' ')}>
            <LogoInput />
            <PhonesHolder />
        </div>
    );
};

export default Basic;