import React, { useContext, useState } from "react";
import { ContextMain } from "../../..";
import styles from "./MyAdmin.module.scss";
import Button from "../../Button";

const MyAdmin = () => {
  const { userStore, galleryStore } = useContext(ContextMain);
  const [name, setName] = useState(userStore?.user?.name);
  const [lastName, setLastName] = useState(userStore?.user?.last_name);
  const [email, setEmail] = useState(userStore?.user?.email);
  const [oldPassord, setOldPassword] = useState("");
  const [newPassord, setNewPassword] = useState("");
  const [newPassordSec, setNewPasswordSec] = useState("");
  const [invalidNewPwd, setInvalidNewPwd] = useState(false);
  const [invalidOldPwd, setInvalidOldPwd] = useState(false);
  const [invalidOldPwdText, setInvalidOldPwdText] =
    useState("Обязятельное поле");

  const handlerChangePass = async (e) => {
    try {
      e.preventDefault();
      if (!oldPassord) {
        setInvalidOldPwd(true);
        setTimeout(() => {
          setInvalidOldPwd(false);
        }, 1500);
        return;
      }
      if (newPassord !== newPassordSec || (!newPassord && !newPassordSec)) {
        setInvalidNewPwd(true);
        setTimeout(() => {
          setInvalidNewPwd(false);
        }, 1500);
        return;
      }
      const isValidatePass = await userStore.validatePass(
        userStore?.user?.email,
        oldPassord
      );
      if (!isValidatePass.data) {
        setInvalidOldPwdText("Неверный пароль");
        setInvalidOldPwd(true);
        setTimeout(() => {
          setInvalidOldPwd(false);
        }, 1500);
        return;
      }
      const changePass = await userStore.changeUserPass(
        userStore?.user?.email,
        oldPassord,
        newPassord
      );
      if (changePass.status === 200) {
        setOldPassword("");
        setNewPassword("");
        setNewPasswordSec("");
        galleryStore.setModalSucc(true);
        galleryStore.setModalMsg("Пароль успешно изменен");
        setTimeout(() => {
          galleryStore.setModalSucc(false);
        }, 1500);
      }
    } catch (error) {
      galleryStore.setModalErr(true);
      galleryStore.setModalMsg(error?.message);
      setTimeout(() => {
        galleryStore.setModalErr(false);
      }, 1500);
    }
  };

  const clickButtonHandlerData = async () => {
    try {
      // check info user is empty
      if (!name && !lastName && !email) {
        galleryStore.setModalErr(true);
        galleryStore.setModalMsg("Все поля должны быть заполнены");
        setTimeout(() => {
          galleryStore.setModalErr(false);
        }, 1500);
        return;
      }

      if (
        userStore.user.name === name &&
        userStore.user.email === email &&
        userStore.user.last_name === lastName
      ) {
        galleryStore.setModalErr(true);
        galleryStore.setModalMsg(`Вы ничего не изменили`);
        setTimeout(() => {
          galleryStore.setModalErr(false);
        }, 1500);
        return;
      }

      const response = await userStore.changeUserInfo(
        userStore?.user?.email,
        name,
        lastName
      );

      if (response?.status === 200) {
        setOldPassword("");
        setNewPassword("");
        setNewPasswordSec("");
        galleryStore.setModalSucc(true);
        galleryStore.setModalMsg("Данные успешно изменены");
        userStore.setUser(response.data);
        setTimeout(() => {
          galleryStore.setModalSucc(false);
        }, 1500);
      } else {
        setOldPassword("");
        setNewPassword("");
        setNewPasswordSec("");
        galleryStore.setModalErr(true);
        galleryStore.setModalMsg(`${response?.data?.message}`);
        setTimeout(() => {
          galleryStore.setModalErr(false);
        }, 1500);
      }
    } catch (error) {
      galleryStore.setModalErr(true);
      galleryStore.setModalMsg(error?.message);
      setTimeout(() => {
        galleryStore.setModalErr(false);
      }, 1500);
    }
  };

  return (
    <div className="container">
      <div className={styles.edit_section}>
        <h2 className={styles.edit_title}>Редактировать профиль</h2>
        <form className={`${styles.edit_form} ${styles.first_form}`}>
          <label
            className={
              !name
                ? styles.edit_form__label + " " + styles.edit_form__label_error
                : styles.edit_form__label
            }
          >
            <span>
              Имя*
              {!name && (
                <div className={styles.invalid}>Поле должно быть заполнено</div>
              )}
            </span>
            <input
              type="text"
              placeholder="Имя*"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label
            className={
              !lastName
                ? styles.edit_form__label + " " + styles.edit_form__label_error
                : styles.edit_form__label
            }
          >
            <span>
              Фамилия*
              {!lastName && (
                <div className={styles.invalid}>Поле должно быть заполнено</div>
              )}
            </span>
            <input
              type="text"
              placeholder={`${userStore?.user?.last_name}`}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          <label
            className={
              !email
                ? styles.edit_form__label + " " + styles.edit_form__label_error
                : styles.edit_form__label
            }
          >
            <span>
              Электронная почта*
              {!email && (
                <div className={styles.invalid}>Поле должно быть заполнено</div>
              )}
            </span>
            <input
              type="text"
              placeholder={`${userStore?.user?.email}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className={styles.edit_form__label}>
            <span>Доступ</span>
            <input
              type="text"
              placeholder={`${userStore?.user?.access}`}
              readOnly
            />
          </label>
        </form>
        <Button onClick={clickButtonHandlerData} className={styles.edit_btn}>
          Сохранить изменения
        </Button>
        <h2 className={styles.edit_title}>Сменить пароль</h2>
        <form className={`${styles.edit_form}`}>
          <label
            className={
              invalidOldPwd
                ? styles.edit_form__label + " " + styles.edit_form__label_error
                : styles.edit_form__label
            }
          >
            <span>
              Действующий пароль
              {invalidOldPwd && (
                <div className={styles.invalid}>{invalidOldPwdText}</div>
              )}
            </span>
            <input
              type="password"
              placeholder="************"
              value={oldPassord}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </label>
          <label
            className={
              invalidNewPwd
                ? styles.edit_form__label + " " + styles.edit_form__label_error
                : styles.edit_form__label + " " + styles.edit_form__label_second
            }
          >
            <span>
              Новый пароль
              {invalidNewPwd && (
                <div className={styles.invalid}>Пароли не совпадают</div>
              )}
            </span>
            <input
              type="password"
              placeholder="************"
              value={newPassord}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </label>
          <label
            className={
              invalidNewPwd
                ? styles.edit_form__label + " " + styles.edit_form__label_error
                : styles.edit_form__label
            }
          >
            <span>
              Подтвердите новый пароль
              {invalidNewPwd && (
                <div className={styles.invalid}>Пароли не совпадают</div>
              )}
            </span>
            <input
              type="password"
              placeholder="************"
              value={newPassordSec}
              onChange={(e) => setNewPasswordSec(e.target.value)}
              required
            />
          </label>
        </form>
        <Button onClick={handlerChangePass} className={styles.edit_btn}>
          Сменить пароль
        </Button>
      </div>
    </div>
  );
};

export default MyAdmin;
