import React from "react";
import styles from "./Container.module.scss";

const Container = ({ children, width }) => {
  return (
    <div className={styles.container} style={{ maxWidth: width }}>
      {children}
    </div>
  );
};

export default Container;
