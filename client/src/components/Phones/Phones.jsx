import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { ContextMain } from '../..';
import cl from './Phones.module.css';


const Phones = observer(({ mobile }) => {
    const { basicStore } = useContext(ContextMain)

    return (
        mobile 
        ?
        <div className={cl.phonesHolderMobile}>
            {basicStore.phones.map(p =>
                <a key={p.id} href={`tel:${p.metaValue}`} className={cl.phoneItem}>{p.metaValue}</a>
            )}
        </div>
        :
        <div className={cl.phonesHolder}>
            {basicStore.phones.map(p =>
                <a key={p.id} href={`tel:${p.metaValue}`} className={cl.phoneItem}>{p.metaValue}</a>
            )}
        </div>
    );
});

export default Phones;