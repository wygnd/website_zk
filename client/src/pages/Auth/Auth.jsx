import React, { useContext, useEffect, useState } from "react";
import authPageStyles from "./Auth.module.scss";
import Button from "../../components/Button";
import Input from "../../components/Input/Input";
import { observer } from "mobx-react-lite";
import { ContextMain } from "../..";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTE } from "../../utils/consts";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const Auth = observer(() => {
  const { userStore, galleryStore } = useContext(ContextMain);
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userStore.isAuth) {
      history(ADMIN_ROUTE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clickHandler = async () => {
    try {
      await userStore.login(email, password).catch((err) => {
        galleryStore.setModalErr(true);
        galleryStore.setModalMsg(err);
        setTimeout(() => {
          galleryStore.setModalErr(false);
        }, 2000);
        return;
      });
      if (userStore.isAuth) {
        history(ADMIN_ROUTE);
      } else {
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      galleryStore.setModalErr(true);
      galleryStore.setModalMsg(error);
      setTimeout(() => {
        galleryStore.setModalErr(false);
      }, 2000);
      return;
    }
  };

  return (
    <div className={authPageStyles.page_auth_wrapper}>
      <div className="container">
        <Breadcrumbs />
        <div className={authPageStyles.page_auth_holder}>
          <h2 className={authPageStyles.page_title}>Авторизация</h2>
          <div className={authPageStyles.auth_holder}>
            <Input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="example@email.ru"
              autoComplete="on"
              required
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Пароль"
              required
            />
            <Button onClick={clickHandler}>Вход</Button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Auth;
