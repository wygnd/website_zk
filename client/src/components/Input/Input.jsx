import React from 'react';
import inputClasses from './Input.module.css';
import InputMask from 'react-input-mask';

const Input = ({ extend, full, className, nBorder, tBorder, mask, error, ...props }) => {

    return (
        mask
            ?

            <InputMask
                {...props}
                className={[inputClasses.input,
                extend && inputClasses.extend,
                full && inputClasses.full,
                    className,
                nBorder && inputClasses.notBorder,
                error && inputClasses.errorValid].join(' ')}
                mask="+7 999 999-99-99"
            />
            :
            <input
                {...props}
                className={[inputClasses.input,
                extend && inputClasses.extend,
                full && inputClasses.full,
                    className,
                nBorder && inputClasses.notBorder,
                error && inputClasses.errorValid].join(' ')}
            />
    );
};

export default Input;