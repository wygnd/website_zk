import React, { useContext, useMemo, useState } from "react";
import classes from "./LogoInput.module.scss";
import { observer } from "mobx-react-lite";
import { ContextMain } from "../../..";
import ModalGallery from "../ModalGallery/ModalGallery";
import { setItem } from "../../../http/basicAPI";
import { SERVER_URL } from "../../../utils/consts";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

const LogoInput = observer(() => {
  const { basicStore } = useContext(ContextMain);
  const [imageId, setImageId] = useState();
  const [modalGallery, setModalGallery] = useState(false);

  useMemo(() => {
    if (!imageId) return;
    setItem("logo", imageId).then((dataImage) => {
      basicStore.setLogo(dataImage);
      basicStore.setUpdate(!basicStore.update);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageId]);

  return (
    <>
      <div className={classes.inputFile}>
          <>
            <Col xs={6} md={4}>
              <Image
                src={basicStore?.logo?.file_path ? basicStore?.logo?.file_path : "/assets/images/placeholder.png"}
                className={classes.logoItem}
                loading="lazy"
                alt={basicStore?.logo?.file_name}
                rounded
              />
            </Col>
          </>

        <Button onClick={() => setModalGallery(true)}>Выбрать логотип</Button>
      </div>
      <ModalGallery
        open={modalGallery}
        clickHandler={() => setModalGallery(false)}
        setOpen={() => setModalGallery(false)}
        getImageId={(id) => setImageId(id)}
      />
    </>
  );
});

export default LogoInput;
