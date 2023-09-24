import React from 'react';
import cl from './Textarea.module.css';

const Textarea = ({ children, full, ...props }) => {
    return (
        <textarea {...props} className={[cl.textarea, full && cl.full].join(' ')}>{children}</textarea>
    );
};

export default Textarea;