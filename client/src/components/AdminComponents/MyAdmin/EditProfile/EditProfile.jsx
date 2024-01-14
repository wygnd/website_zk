import React from "react";
import styles from "./EditProfile.module.scss";

const EditProfile = () => {
  return (
    <div className={styles.edit_section}>
      <h2 className={styles.edit_title}>Редактировать профиль</h2>
      <form className={styles.edit_form}>
        <label className={styles.edit_form__label}>
          <span>Имя*</span>
          <input type="text" placeholder="" />
        </label>
        <label className={styles.edit_form__label}>
          <span></span>
          <input type="text" />
        </label>
        <label className={styles.edit_form__label}>
          <span></span>
          <input type="text" />
        </label>
        <label className={styles.edit_form__label}>
          <span></span>
          <input type="text" />
        </label>
        <label className={styles.edit_form__label}>
          <span></span>
          <input type="text" />
        </label>
      </form>
    </div>
  );
};

export default EditProfile;
