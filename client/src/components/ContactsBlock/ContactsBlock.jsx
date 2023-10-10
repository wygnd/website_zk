import React from 'react';
import cl from './ContactsBlock.module.css';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

const ContactsBlock = () => {
    return (
        <div id='contacts__block' className={cl.contactsBlock}>
            <div className="container">
                <h2 className={cl.blockTitle}>Контакты</h2>
                <div className={cl.blockHolder}>
                    <YMaps className={cl.mapHolder}>
                        <Map
                            className={cl.mapHolder}
                            defaultState={{
                                center: [59.230483, 39.897991],
                                zoom: 18,
                                controls: ["zoomControl", "fullscreenControl"]
                            }}
                            modules={["control.ZoomControl", "control.FullscreenControl"]}
                        >
                            <Placemark geometry={[59.230483, 39.897991]} />
                        </Map>
                    </YMaps>
                </div>
            </div>
        </div>
    );
};

export default ContactsBlock;