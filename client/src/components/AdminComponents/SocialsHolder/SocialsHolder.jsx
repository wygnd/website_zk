import React, { useContext } from 'react';
import cl from './SocialsHolder.module.css';
import { ContextMain } from '../../..';
import SocialItem from '../SocialItem/SocialItem';
import { observer } from 'mobx-react-lite';
import CreateSocItem from '../CreateSocItem/CreateSocItem';

const SocialsHolder = observer(() => {

    const { basicStore } = useContext(ContextMain);

    return (
        <div className={cl.socialWrapper}>
            <div className={cl.socialsHolder}>
                {basicStore.socials.length === 0
                    ?
                    <h4>Соц. сетей не найдено</h4>
                    :
                    basicStore.socials.map(el =>
                        <SocialItem
                            key={el.metaKey}
                            iconId={el.iconId}
                            metaKey={el.metaKey}
                            link={el.metaValue}
                            className={cl.socialItem}
                        />
                    )
                }
            </div>
            <CreateSocItem />
        </div>
    );
});

export default SocialsHolder;