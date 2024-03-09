/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Header from "./components/Header";
import {observer} from "mobx-react-lite";
import {ContextMain} from ".";
import {fetchSlides} from "./http/mainBlockAPI";
import {fetchItem, fetchItems} from "./http/basicAPI";
import {fetchLastTour, fetchTours} from "./http/toursAPI";
import Footer from "./components/Footer/Footer";
import {getImageById} from "./http/galleryAPI";
import uuid from "react-uuid";
import {fetchGallery} from "./http/galleryBlockAPI";
import Loading from "./components/Loading/Loading";
import {YMaps} from "@pbe/react-yandex-maps";

const App = observer(() => {
	const {
		userStore,
		mainBlockStore,
		basicStore,
		tourStore,
		collections,
		about,
		galleryBlock,
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
		fetchSlides().then((data) => {
			if(data.length === 0) {
				mainBlockStore.setSlides([]);
				return false;
			}
			mainBlockStore.setSlides(data);
		});
	}, [mainBlockStore.update]);
	
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
		fetchTours().then((data) => {
			tourStore.setTours(data || []);
		});
	}, [tourStore.update]);
	
	useEffect(() => {
		fetchLastTour().then(data => {
			if(!data) return;
			tourStore.setLastItem(data);
		})
		
		fetchItem("lastTourVisible").then((data) => {
			if(data.metaValue === "0") {
				tourStore.setLastItemVisible(false);
			} else {
				tourStore.setLastItemVisible(true);
			}
		});
	}, [tourStore.updateLastItem]);
	
	useEffect(() => {
		fetchItem("collections_desc").then((data) => {
			collections.setDesc(data);
		});
		
		fetchItem("collections_images").then((data) => {
			if(!data) return;
			collections.setGallery([]);
			const arrayImages = data.metaValue.split("+");
			arrayImages.map((img) =>
				getImageById(img).then((response) => {
					collections.addGallery({...response, uuId: uuid()});
				})
			);
			collections.setCountImages(data.metaValue.split("+").length);
		});
	}, [collections.update]);
	
	useEffect(() => {
		fetchItem("about_desc").then((data) => {
			about.setDesc(data.metaValue);
		});
		
		fetchItem("about_image").then((data) => {
			getImageById(data.metaValue).then((res) => {
				about.setImage(res);
			});
		});
	}, [about.update]);
	
	useEffect(() => {
		fetchGallery().then((res) => {
			res.map((el) =>
				getImageById(el?.galleryId).then((res) => {
					galleryBlock.setGallery([...galleryBlock.images, res,]);
				})
			);
		});
	}, [galleryBlock.update]);
	
	
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
	
	
	if(userStore.isLoading) {
		return <Loading/>
	}
	
	return (
		<>
			<Helmet>
				<title>{siteTitle}</title>
				<html lang="ru"/>
				<meta name="author" content="Denis Nekrasov"/>
				<meta name="description" content={siteDesc}/>
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
			</Helmet>
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
		</>
	);
});

export default App;
