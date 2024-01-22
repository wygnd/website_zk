import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./Admin.module.scss";
import "../../styles/main.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { IoMdSettings } from "react-icons/io";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import Basic from "../../components/AdminComponents/basic/Basic";
import Container from "../../components/Container/Container";
import Main from "../../components/AdminComponents/Main/Main";
// import Tour from "../../components/AdminComponents/Tour/Tour";
// import Collections from "../../components/AdminComponents/Collections/Collections";
// import About from "../../components/AdminComponents/About/About";
// import Gallery from "../../components/AdminComponents/Gallery/Gallery";

const Admin = observer(() => {
  return (
    <main className={styles.page_admin}>
      <Container width={1290}>
        <h1 className={styles.page__title}>Панель администратора</h1>

        <Tabs
          disableUpDownKeys={true}
          focusTabOnClick={false}
          selectedTabClassName={styles.admin__holder_navigation_item__active}
          selectedTabPanelClassName={styles.admin__holder_content__active}
          className={styles.admin__holder}
        >
          <TabList className={styles.admin__holder_navigation}>
            <Tab className={styles.admin__holder_navigation_item}>
              <IoMdSettings size={24} />
              Основные
            </Tab>
            <Tab className={styles.admin__holder_navigation_item}>
              <TfiLayoutSliderAlt size={24} />
              Главный блок
            </Tab>
          </TabList>
          <TabPanel className={styles.admin__holder_content}>
            <Basic />
          </TabPanel>
          <TabPanel className={styles.admin__holder_content}>
            <Main />
          </TabPanel>
        </Tabs>
      </Container>
    </main>
  );
});

export default Admin;
