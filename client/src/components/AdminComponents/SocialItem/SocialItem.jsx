import React from 'react';
import cl from './SocialItem.module.css';

const SocialItem = ({ icon, link, }) => {
    return (
        <a href={link} target='_blank' className={cl.socItem}>
            {icon}
        </a>
    );
};

export default SocialItem;