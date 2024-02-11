import {observer} from 'mobx-react-lite';
import React, {useContext} from 'react';
import {ContextMain} from '../..';
import cl from './Phones.module.scss';


const Phones = observer(({mobile}) => {
  const {basicStore} = useContext(ContextMain)

  if(!basicStore) return;

  return (
    mobile
      ?
      basicStore.phones.length !== 0 && (
        <div className={cl.phonesHolderMobile}>
          {basicStore.phones.map(p =>
            <a key={p.id} href={`tel:${p.metaValue}`} className={cl.phoneItem}>{p.metaValue}</a>
          )}
        </div>
      )
      :
      basicStore.phones.length !== 0 &&
      <div className={cl.phonesHolder}>
        {basicStore.phones.map(p =>
          <a key={p.id} href={`tel:${p.metaValue}`} className={cl.phoneItem}>{p.metaValue}</a>
        )}
      </div>
  );
});

export default Phones;