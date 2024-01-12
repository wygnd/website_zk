import React, { useContext } from "react";
import cl from "./ContactsBlock.module.css";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import Phones from "../Phones/Phones";
import Socials from "../Socials/Socials";
import { observer } from "mobx-react-lite";
import { ContextMain } from "../..";
import Emails from "../Emails/Emails";

const ContactsBlock = observer(() => {
  const { contactsStore, basicStore } = useContext(ContextMain);

  return (
    <div id="contacts__block" className={cl.contactsBlock}>
      <div className="container">
        <div className={cl.blockHolder}>
          <div className={cl.leftSide}>
            <h2 className={cl.blockTitle}>Контакты</h2>
            {basicStore.phones.length !== 0 && (
              <div className={cl.phonesHolder}>
                <div className={cl.nameHolder}>Номер телефона</div>
                <Phones mobile />
              </div>
            )}
            {basicStore.emails.length !== 0 && (
              <div className={cl.emailsHolder}>
                <div className={cl.nameHolder}>Электронная почта</div>
                <Emails />
              </div>
            )}
            {basicStore.socials.length !== 0 && (
              <div className={cl.socHolder}>
                <Socials mobile />
              </div>
            )}
          </div>
          <YMaps
            className={cl.mapHolder}
            apiKey="bb646deb-f3ce-470a-9ad6-7ac0fc1efc05"
            query={{
              lang: "en_RU",
            }}
          >
            <Map
              className={cl.mapHolder}
              defaultState={{
                center: contactsStore.map,
                zoom: 16,
                controls: ["zoomControl", "fullscreenControl"],
              }}
              width="100%"
              height={520}
              modules={["control.ZoomControl", "control.FullscreenControl"]}
            >
              <Placemark geometry={contactsStore.map} />
            </Map>
          </YMaps>
        </div>
      </div>
    </div>
  );
});

export default ContactsBlock;
