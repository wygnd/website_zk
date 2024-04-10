import React from "react";
import {observer} from "mobx-react-lite";
import styles from "./Admin.module.scss";
import "../../styles/main.scss";
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
import {RiTeamFill} from "react-icons/ri";
import AdminTabs from "./AdminTabs";
import TeamList from "../../components/AdminComponents/Teams/TeamList";

const Admin = observer(() => {
	
	const tabs = [
		{
			id: 1,
			icon: <IoMdSettings size={24}/>,
			text: "Основные"
		},
		{
			id: 2,
			icon: <TfiLayoutSliderAlt size={24}/>,
			text: "Главный блок",
		},
		{
			id: 7,
			icon: <RiOrganizationChart size={24}/>,
			text: "О проекте"
		},
		{
			id: 4,
			icon: <VscArchive size={24}/>,
			text: "Экскурсии"
		},
		{
			id: 3,
			icon: <MdOutlineCollectionsBookmark size={24}/>,
			text: "Бар-музей"
		},
		{
			id: 5,
			icon: <GrGallery size={24}/>,
			text: "Галерея"
		},
		{
			id: 6,
			icon: <RiTeamFill size={24}/>,
			text: "Команда"
		},
		{
			id: 8,
			icon: <MdContacts size={24}/>,
			text: "Контакты"
		},
	];
	
	const contents = [
		{
			id: 1,
			content: <Basic/>
		},
		{
			id: 2,
			content: <Main/>,
		},
		{
			id: 7,
			content: <About/>,
		},
		{
			id: 4,
			content: <Tour/>,
		},
		{
			id: 3,
			content: <Collections/>,
		},
		{
			id: 5,
			content: <Gallery/>,
			
		}, {
			id: 6,
			content: <TeamList/>,
		},
		{
			id: 8,
			content: <Contacts/>
		}
	]
	
	return (
		<main className={styles.page_admin}>
			<Container width={1290}>
				<h1 className={styles.page__title}>Панель администратора</h1>
				<AdminTabs tabs={tabs} contents={contents}/>
			</Container>
		</main>
	);
});

export default Admin;
