import React from 'react';
import inputClasses from './Input.module.css';

const Input = ({extend, full, ...props }) => {
    return (
        <input {...props} className={[inputClasses.input, extend && inputClasses.extend, full && inputClasses.full].join(' ')} />
    );
};

export default Input;