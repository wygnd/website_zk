import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import cl from './Emails.module.scss';
import { ContextMain } from '../..';

const Emails = observer(() => {

    const { basicStore } = useContext(ContextMain);

    if (basicStore.emails.length === 0) {
        return;
    }

    return (
        <div className={cl.emailsHolder} >
            {basicStore.emails.map(m =>
                <a key={m.id} href={`mailto:${m.metaValue}`} data-key={m.metaKey} data-value={m.metaValue} className={cl.emailItem}>
                    {m.metaValue}
                </a>
            )}
        </div>
    );
});

export default Emails;