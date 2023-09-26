import React from 'react';
import inputClasses from './Input.module.css';

const Input = ({ extend, full, className, nBorder, tBorder, ...props }) => {
    return (
        <input
            {...props}
            className={[inputClasses.input,
            extend && inputClasses.extend,
            full && inputClasses.full,
                className,
            nBorder && inputClasses.notBorder].join(' ')}
        />
    );
};

export default Input;