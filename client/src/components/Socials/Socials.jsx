import React, { useContext, useEffect, useState } from 'react';
import { ContextMain } from '../..';
import cl from './Socials.module.css';
import { observer } from 'mobx-react-lite';
import SocialItem from '../SocialItem';

const Socials = observer(({ mobile }) => {
    const { basicStore } = useContext(ContextMain);
    
    return (
        mobile
            ?
            <div className={cl.socHolderMobile}>
                {basicStore.socials.map(soc =>
                    <SocialItem
                        key={soc.metaKey}
                        link={soc.metaValue}
                        imageId={soc.iconId}
                        className={cl.socItem}
                    />
                )}
            </div>
            :
            <div className={cl.socHolder}>
                {basicStore.socials.map(soc =>
                    <SocialItem
                        key={soc.metaKey}
                        link={soc.metaValue}
                        imageId={soc.iconId}
                        className={cl.socItem}
                    />
                )}
            </div>
    );
});

export default Socials;