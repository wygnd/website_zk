/* eslint-disable react-hooks/exhaustive-deps */
import React, {lazy, Suspense, useContext, useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import {BrowserRouter} from "react-router-dom";
import Header from "./components/Header";
import {observer} from "mobx-react-lite";
import {ContextMain} from ".";
import {fetchItem, fetchItems} from "./http/basicAPI";
import Footer from "./components/Footer/Footer";
import {getImageById} from "./http/galleryAPI";
import {YMaps} from "@pbe/react-yandex-maps";
import Loading from "./components/Loading/Loading";

const AppRouter = lazy(() => import("./components/AppRouter"));

const App = observer(() => {
	const {
		userStore,
		basicStore,
	} = useContext(ContextMain);
	const [siteTitle, setSiteTitle] = useState("");
	const [siteDesc, setSiteDesc] = useState("");
	
	useEffect(() => {
		if(localStorage.getItem("token")) {
			userStore.checkAuth().then(data => {
				if(data.status === false) {
					console.log(data.message);
					localStorage.removeItem('token');
				}
				userStore.setLoading(false);
			});
		}
	}, []);
	
	useEffect(() => {
		fetchItem("logo").then((data) => {
			getImageById(data.metaValue, "full").then((res) => {
				basicStore.setLogo(res);
			});
		});
		fetchItems("phone").then(res => {
			basicStore.setPhones(res.data || null);
		}).catch(err => {
			console.log(err);
		});
		fetchItems("soc").then((res) => {
			const dataRequest = [];
			if(res.data.length === 0) {
				basicStore.setSocials([]);
				return;
			}
			res.data.forEach((soc) => {
				const dataSoc = {
					metaKey: soc.metaKey,
					metaValue: soc.metaValue.split("+")[0],
					iconId: soc.metaValue.split("+")[1],
				};
				
				dataRequest.push(dataSoc);
			});
			basicStore.setSocials(dataRequest);
		});
		fetchItems("email").then((res) => {
			basicStore.setEmails(res.data);
		});
	}, [basicStore.update]);
	
	
	useEffect(() => {
		fetchItem("siteTitle").then((data) => {
			basicStore.setSiteTitle(data);
			setSiteTitle(data?.metaValue);
		});
		
		fetchItem("siteDesc").then((data) => {
			basicStore.setSiteDesc(data);
			setSiteDesc(data?.metaValue);
		});
	}, [basicStore.update]);
	
	
	return (
		<>
			<Helmet>
				<title>{siteTitle || "Заголовок сайта"}</title>
				<html lang="ru"/>
				<meta name="author" content="Denis Nekrasov"/>
				<meta name="description" content={siteDesc || "Описание сайта"}/>
				<link rel="shortcut icon" href="favicon.ico" type="image/x-icon"/>
				<meta
					property="og:image"
					content="https://developer.mozilla.org/mdn-social-share.png"
				/>
				<meta
					property="og:description"
					content={siteDesc}
				/>
				<meta property="og:title" content={siteTitle}/>
				<meta httpEquiv="Content-Language" content="ru"/>
				<meta name="robots" content="index"/>
				<meta name="keywords"
				      content="заречный квартал, заречный квартал вологда, заречный квартал 1840, заречный квартал чернышевского 56, заречный квартал 1840 ул чернышевского 56"/>
			</Helmet>
			<Suspense fallback={<Loading title="Загрузка"/>}>
				<BrowserRouter>
					<Header/>
					<YMaps query={{
						lang: "ru_RU",
						suggest_apikey: "40148efb-4df5-4e4a-a765-589233b94b6c",
						apikey: "40148efb-4df5-4e4a-a765-589233b94b6c",
						
					}}>
						<AppRouter/>
					</YMaps>
					<Footer/>
				</BrowserRouter>
			</Suspense>
		</>
	);
});

export default App;
