import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import cl from "./Footer.module.scss";
import { ContextMain } from "../..";
import ModalError from "../AdminComponents/ModalError/ModalError";
import ModalSuccess from "../AdminComponents/ModalSuccess/ModalSuccess";
import { Link } from "react-router-dom";
import { PRIVACY_ROUTE } from "../../utils/consts";

const Footer = observer(() => {
  const { galleryStore } = useContext(ContextMain);

  return (
    <>
      <div id={cl.footer} onClick={() => galleryStore.setModal(true)}>
        <div className="container">
          <div className={cl.footerHolder}>
            <Link to={PRIVACY_ROUTE} className={cl.privacyLink}>
              Политика конфиденциальности
            </Link>
            <p className={cl.comment}>
              Проект реализуется при поддержке Президентского фонда культурных
              инициатив.
            </p>
            <div className={cl.copyWrite}>© 2023. Компания «СЗД-СТРОЙ»</div>
          </div>
        </div>
      </div>
      <ModalError
        isError={galleryStore.modalErr}
        clickCloseModal={() => galleryStore.setModalErr(false)}
      >
        {galleryStore.messageModal}
      </ModalError>
      <ModalSuccess
        isSuccess={galleryStore.modalSucc}
        clickHandlerModalSuccess={() => galleryStore.setModalSucc(false)}
      >
        {galleryStore.messageModal}
      </ModalSuccess>
    </>
  );
});

export default Footer;
