import React, { useContext } from 'react';
import cl from './ContactsBlock.module.css';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import Phones from '../Phones/Phones';
import Socials from '../Socials/Socials';
import { observer } from 'mobx-react-lite';
import { ContextMain } from '../..';

const ContactsBlock = observer(() => {

    const { contactsStore } = useContext(ContextMain);


    return (
        <div id='contacts__block' className={cl.contactsBlock}>
            <div className={cl.blockHolder}>
                <div className={cl.leftSide}>
                    <h2 className={cl.blockTitle}>Контакты</h2>
                    <div className={cl.phonesHolder}>
                        <div className={cl.nameHolder}>Номер телефона</div>
                        <Phones mobile />
                    </div>

                    <div className={cl.socHolder}>
                        <Socials mobile />
                    </div>
                </div>
                <YMaps
                    className={cl.mapHolder}
                    apiKey='bb646deb-f3ce-470a-9ad6-7ac0fc1efc05'
                    query={{
                        lang: 'en_RU'
                    }}
                >
                    <Map
                        className={cl.mapHolder}
                        defaultState={{
                            center: contactsStore.map,
                            zoom: 16,
                            controls: ["zoomControl", "fullscreenControl"]
                        }}
                        width="100%"
                        height={400}
                        modules={["control.ZoomControl", "control.FullscreenControl"]}
                    >
                        <Placemark geometry={contactsStore.map} />
                    </Map>
                </YMaps>
            </div>
        </div >
    );
});

export default ContactsBlock;