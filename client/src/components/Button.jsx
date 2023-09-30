import React from 'react';
import headerClasses from '../styles/Header.module.css';

const Button = ({ children, invert, error, className, svg, ...props }) => {


    return (
        <button disabled={error} {...props}
            className={
                [headerClasses.btn,
                invert && headerClasses.invert,
                error && headerClasses.error,
                svg && headerClasses.svg,
                    className].join(' ')}
        >{children}</button>
    );
};

export default Button;