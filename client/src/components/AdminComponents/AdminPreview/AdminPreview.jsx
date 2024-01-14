/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import styles from "./AdminPreview.module.scss";
import { observer } from "mobx-react-lite";
import { ContextMain } from "../../..";
import { useNavigate } from "react-router-dom";
import {
  MAIN_ROUTE,
  ADMIN_ROUTE,
  ADMIN_ACCOUNT_ROUTE,
} from "../../../utils/consts";

const AdminPreview = observer(() => {
  const { userStore, galleryStore } = useContext(ContextMain);
  const [panel, setPanel] = useState(false);
  const history = useNavigate();

  const togglerHandler = () => {
    setPanel(!panel);
  };

  const logoutClickHandler = async () => {
    try {
      setPanel(false);
      await userStore
        .logout()
        .then((data) => {
          galleryStore.setModalSucc(true);
          galleryStore.setModalMsg(data);
          setTimeout(() => {
            galleryStore.setModalSucc(false);
          }, 2000);
        })
        .catch((err) => {
          galleryStore.setModalErr(true);
          galleryStore.setModalMsg(err);
          setTimeout(() => {
            galleryStore.setModalErr(false);
          }, 2000);
        });
      history(MAIN_ROUTE);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.user_holder}>
      <div className={styles.user_holder_top} onClick={togglerHandler}>
        <div className={styles.user_email}>{userStore?.user?.email}</div>
        <div className={`${styles.user_toggler}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M7 10L12 15L17 10H7Z" fill="#8E8E93" />
          </svg>
        </div>
      </div>
      {panel && (
        <>
          <div className={styles.user_panel}>
            <div
              className={styles.user_panel_item}
              onClick={() => {
                setPanel(false);
                history(ADMIN_ACCOUNT_ROUTE + "/" + userStore?.user?.id);
              }}
            >
              Мой кабинет
            </div>
            <div
              className={styles.user_panel_item}
              onClick={() => {
                history(ADMIN_ROUTE);
                setPanel(false);
              }}
            >
              Панель
            </div>
            <div
              className={styles.user_panel_item}
              onClick={logoutClickHandler}
            >
              Выйти
            </div>
          </div>
        </>
      )}
    </div>
  );
});

export default AdminPreview;
