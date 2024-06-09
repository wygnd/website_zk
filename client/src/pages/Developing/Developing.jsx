import React, {useEffect, useState} from 'react';
import Container from "../../components/Container/Container";
import styles from "./Developing.module.scss";
import {Helmet} from "react-helmet";
import Button from "../../components/Button";
import {useNavigate} from "react-router-dom";
import {MAIN_ROUTE} from "../../utils/consts";

const Developing = () => {
	const [desc, setDesc] = useState("");
	const [width, setWidth] = useState(window.innerWidth);
	const history = useNavigate();
	
	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}
	
	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange);
		const isMobile = width <= 1280
		
		if(isMobile) {
			setDesc("Страница находится в разработке или не доступна для <b>мобильной версии</b>, пожалуйста, попробуйте зайти с компьютера")
		} else {
			setDesc("Страница находится в разработке или не доступна, пожалуйста, вернитесь на главную страницу")
		}
		
		setDesc("Сайт находится на техническом обслуживании");
		
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange);
		}
	}, []);
	
	const handleClickButtonToMainRedirect = () => {
		history(MAIN_ROUTE);
	}
	
	return (
		<>
			<Helmet>
				<title>{desc ? desc : "Страница находтся в разработке"}</title>
				<meta name="description" content="Эта страница временно недоступна"/>
			</Helmet>
			<main className={styles.dev_page}>
				<Container>
					<div className={styles.dev_holder}>
						<h1 className={styles.dev_holder__title}>Эта страница временно недоступна</h1>
						<div className={styles.dev_holder__desc} dangerouslySetInnerHTML={{__html: desc}}/>
						<div className={styles.dev_holder__buttons}>
							<Button onClick={handleClickButtonToMainRedirect}>Вернуться на главную</Button>
						</div>
					</div>
				</Container>
			</main>
		</>
	);
};

export default Developing;