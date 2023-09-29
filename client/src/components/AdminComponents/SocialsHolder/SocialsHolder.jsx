import React, { useContext } from 'react';
import cl from './SocialsHolder.module.css';
import { ContextMain } from '../../..';
import SocialItem from '../SocialItem/SocialItem';

const SocialsHolder = () => {

    const { basicStore } = useContext(ContextMain);

    return (
        <div className={cl.socialsHolder}>
            {basicStore.socials.map(el =>
                <SocialItem icon={el.icon} link={el.metaValue} />
            )}
        </div>
    );
};

export default SocialsHolder;