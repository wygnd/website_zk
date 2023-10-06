import React from 'react';
import cl from './Textarea.module.css';

const Textarea = ({ children, full, h200, className, ...props }) => {
    return (
        <textarea {...props} className={[cl.textarea, full && cl.full, h200 && cl.h200, className].join(' ')}>{children}</textarea>
    );
};

export default Textarea;