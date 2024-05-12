import React from "react";
import MainBlock from "../../components/MainBlock/MainBlock";
import cl from "./Main.module.scss";
import ToursBlock from "../../components/ToursBlock/ToursBlock";
import CollectionsBlock from "../../components/CollectionsBlock/CollectionsBlock";
import AboutBlock from '../../components/AboutBlock/AboutBlock';
import GalleryBlock from "../../components/GalleryBlock/GalleryBlock";
import ContactsBlock from '../../components/ContactsBlock/ContactsBlock';
import {observer} from "mobx-react-lite";
import TeamsBlock from "../../components/teamsBlock/TeamsBlock";
import TextBlock from "../../components/textBlock/TextBlock";

const Main = observer(() => {
	
	return (
		<main className={cl.home}>
			<MainBlock/>
			<AboutBlock/>
			<ToursBlock/>
			<CollectionsBlock/>
			<TextBlock/>
			<GalleryBlock/>
			<TeamsBlock/>
			<ContactsBlock/>
		</main>
	
	);
});

export default Main;
