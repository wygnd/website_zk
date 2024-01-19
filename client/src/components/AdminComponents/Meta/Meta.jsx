import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { ContextMain } from "../../..";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import styles from "./Meta.module.scss";
import { setItem } from "../../../http/basicAPI";

const Meta = observer(() => {
  const { basicStore, galleryStore } = useContext(ContextMain);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [valid, setValid] = useState(null);

  useEffect(() => {
    if (!basicStore.siteTitle || !basicStore.siteDesc) return;
    setTitle(basicStore?.siteTitle?.metaValue);
    setDesc(basicStore?.siteDesc?.metaValue);
  }, [basicStore.siteTitle, basicStore.siteDesc, basicStore.update]);

  const handlerSubmit = async (event) => {
    try {
      event.preventDefault();
      event.stopPropagation();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        setValid(false);
      }

      if (
        title === basicStore?.siteTitle?.metaValue &&
        desc === basicStore?.siteDesc?.metaValue
      ) {
        galleryStore.setModalErr(true);
        galleryStore.setModalMsg("Ничего не изменено");
        setTimeout(() => {
          galleryStore.setModalErr(false);
        }, 3000);
        setValid(false);
        return;
      }

      const updatedTitle = await setItem("siteTitle", title);
      const updatedDesc = await setItem("siteDesc", desc);

      basicStore.setSiteTitle(updatedTitle.metaValue);
      basicStore.setSiteDesc(updatedDesc.metaValue);
      setValid(true);
      galleryStore.setModalSucc(true);
      galleryStore.setModalMsg("Информация о сайте успешно изменена");
      setTimeout(() => {
        galleryStore.setModalSucc(false);
        setValid(null);
      }, 3000);
    } catch (error) {
      galleryStore.setModalErr(true);
      galleryStore.setModalMsg(`Что-то пошло не так, ${error}`);
      setTimeout(() => {
        galleryStore.setModalErr(false);
      }, 3000);
    }
  };

  return (
    <Form
      type="invalid"
      className={styles.meta_holder}
      validated={valid}
      onSubmit={handlerSubmit}
    >
      <Form.Group
        type="invalid"
        tooltip="true"
        className="mb-3"
        controlId="validationTitle"
      >
        <InputGroup hasValidation>
          <InputGroup.Text id="site-title">Название сайта</InputGroup.Text>
          <Form.Control
            type="text"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Название сайта"
            aria-describedby="site-title"
          />
        </InputGroup>
      </Form.Group>
      <Form.Group className="mb-3" controlId="validationDesc">
        <InputGroup hasValidation>
          <InputGroup.Text id="site-desc">Описание сайта</InputGroup.Text>
          <Form.Control
            as="textarea"
            style={{ height: "100px", resize: "none" }}
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            placeholder="Описание сайта"
            required
            aria-describedby="site-desc"
          />
        </InputGroup>
      </Form.Group>
      <Button type="submit" style={{ marginLeft: "auto" }}>
        Сохранить изменения
      </Button>
    </Form>
  );
});

export default Meta;
