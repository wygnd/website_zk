import React from "react";
import {observer} from "mobx-react-lite";
import styles from "./Admin.module.scss";
import "../../styles/main.scss";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import {IoMdSettings} from "react-icons/io";
import {TfiLayoutSliderAlt} from "react-icons/tfi";
import Basic from "../../components/AdminComponents/basic/Basic";
import Container from "../../components/Container/Container";
import Main from "../../components/AdminComponents/Main/Main";
import Tour from "../../components/AdminComponents/Tour/Tour";
import {VscArchive} from "react-icons/vsc";
import {MdOutlineCollectionsBookmark} from "react-icons/md";
import Collections from "../../components/AdminComponents/Collections/Collections";
import {RiOrganizationChart} from "react-icons/ri";
import About from "../../components/AdminComponents/About/About";
import {GrGallery} from "react-icons/gr";
import Gallery from "../../components/AdminComponents/Gallery/Gallery";
import {MdContacts} from "react-icons/md";
import Contacts from "../../components/AdminComponents/Contacts/Contacts";

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
							<IoMdSettings size={24}/>
							Основные
						</Tab>
						<Tab className={styles.admin__holder_navigation_item}>
							<TfiLayoutSliderAlt size={24}/>
							Главный блок
						</Tab>
						<Tab className={styles.admin__holder_navigation_item}>
							<VscArchive size={24}/>
							Экскурсии
						</Tab>
						<Tab className={styles.admin__holder_navigation_item}>
							<MdOutlineCollectionsBookmark size={24}/>
							Коллеция
						</Tab>
						<Tab className={styles.admin__holder_navigation_item}>
							<RiOrganizationChart size={24}/>
							О проекте
						</Tab>
						<Tab className={styles.admin__holder_navigation_item}>
							<GrGallery size={24}/>
							Галерея
						</Tab>
						<Tab className={styles.admin__holder_navigation_item}>
							<MdContacts size={24}/>
							Контакты
						</Tab>
					</TabList>
					<TabPanel className={styles.admin__holder_content}>
						<Basic/>
					</TabPanel>
					<TabPanel className={styles.admin__holder_content}>
						<Main/>
					</TabPanel>
					<TabPanel className={styles.admin__holder_content}>
						<Tour/>
					</TabPanel>
					<TabPanel className={styles.admin__holder_content}>
						<Collections/>
					</TabPanel>
					<TabPanel className={styles.admin__holder_content}>
						<About/>
					</TabPanel>
					<TabPanel className={styles.admin__holder_content}>
						<Gallery/>
					</TabPanel>
					<TabPanel className={styles.admin__holder_content}>
						<Contacts/>
					</TabPanel>
				</Tabs>
			</Container>
		</main>
	);
});

export default Admin;
