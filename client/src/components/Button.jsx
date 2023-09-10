import React from 'react';
import headerClasses from '../styles/Header.module.css';

const Button = ({ children, invert, ...props }) => {

    
    return (
        <button {...props} className={[headerClasses.btn, invert && headerClasses.invert].join(' ')}>{children}</button>
    );
};

export default Button;