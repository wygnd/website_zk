import React from 'react';
import styles from './Loading.module.scss'

const Loading = ({title}) => {
  return (
    <div className={styles.loader}>
      {title && <h2 className={styles.loader_title}>{title}</h2>}
      <div className={styles.loader_circle}></div>
    </div>
  );
};

export default Loading;