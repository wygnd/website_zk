import React, {lazy, Suspense, useEffect, useState} from "react";
import cl from "./Main.module.scss";
import {observer} from "mobx-react-lite";
// import Developing from "../Developing/Developing";
import Loading from "../../components/Loading/Loading";
import {InView} from "react-intersection-observer";

const MainBlock = lazy(() => import("../../components/MainBlock/MainBlock"));
const AboutBlock = lazy(() => import("../../components/AboutBlock/AboutBlock"));
const ToursBlock = lazy(() => import("../../components/ToursBlock/ToursBlock"));
const CollectionsBlock = lazy(() => import("../../components/CollectionsBlock/CollectionsBlock"));
const TextBlock = lazy(() => import("../../components/textBlock/TextBlock"));
const GalleryBlock = lazy(() => import("../../components/GalleryBlock/GalleryBlock"));
const TeamsBlock = lazy(() => import("../../components/teamsBlock/TeamsBlock"));
const ContactsBlock = lazy(() => import("../../components/ContactsBlock/ContactsBlock"));

const Main = observer(() => {
	
	const [showComponents, setShowComponents] = useState(false);
	
	return (
		<main className={cl.home}>
			<Suspense fallback={<Loading/>}>
				<Suspense fallback={<Loading/>}>
					<MainBlock/>
				</Suspense>
				<Suspense fallback={<Loading/>}>
					<AboutBlock/>
				</Suspense>
				<Suspense fallback={<Loading/>}>
					<ToursBlock/>
				</Suspense>
				<Suspense fallback={<Loading/>}>
					<CollectionsBlock/>
				</Suspense>
				<Suspense fallback={<Loading/>}>
					<TextBlock/>
				</Suspense>
				<Suspense fallback={<Loading/>}>
					<GalleryBlock/>
				</Suspense>
				<Suspense fallback={<Loading/>}>
					<TeamsBlock/>
				</Suspense>
				<Suspense fallback={<Loading/>}>
					<ContactsBlock/>
				</Suspense>
			</Suspense>
			{/*<Developing />*/}
		</main>
	
	);
});

export default Main;
