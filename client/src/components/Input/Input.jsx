import React from 'react';
import inputClasses from './Input.module.css';

const Input = ({ ...props }) => {
    return (
        <input {...props} className={inputClasses.input} />
    );
};

export default Input;