import React, {useContext, useEffect, useRef} from 'react';
import {observer} from "mobx-react-lite";
import {ContextMain} from "../../index";
import {getTeams} from "../../http/teamsApi";
import Container from "../Container/Container";
import {Swiper, SwiperSlide} from "swiper/react";
import TeamItem from "./TeamItem";
import styles from "./TeamsBlock.module.scss";
import cl from "../GalleryBlock/GalleryBlock.module.scss";
import {A11y, Navigation} from "swiper/modules";

const TeamsBlock = observer(() => {
	const {teamsStore} = useContext(ContextMain);

	useEffect(() => {
		if(teamsStore.teams.length === 0) {
			getTeams().then(res => {
				teamsStore.setTeams(res);
			});
		}
	}, [teamsStore.teams]);
	
	if(teamsStore.teams.length === 0) {
		return null;
	}
	
	return (
		<div id="teams__block" className={styles.teamsBlock}>
			<Container>
				<h2 className={styles.teamsBlock__title}>Наша команда</h2>
				<div className={styles.teamsBlock__holder}>
					<Swiper
						modules={[Navigation, A11y]}
						speed={800}
						lazy={"true"}
						navigation={{
							nextEl: "#teams__block .arrow__next",
							prevEl: "#teams__block .arrow__prev",
							disabledClass: ".swiper-button-disabled",
						}}
						breakpoints={{
							0: {
								slidesPerView: 2,
								spaceBetween: 10,
							},
							460: {
								slidesPerView: 3,
								spaceBetween: 10,
							},
							520: {
								slidesPerView: 3,
								spaceBetween: 10,
							},
							760: {
								slidesPerView: 4,
								spaceBetween: 10,
							},
							992: {
								slidesPerView: 5,
								spaceBetween: 20,
							},
						}}
					>
						{teamsStore.teams.map((team) => (
							<SwiperSlide key={team.id}>
								<TeamItem team={team}/>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
				<div className={styles.teamsBlock__theme}>
					<div className={[cl.slidePrev, "arrow__prev"].join(" ")}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="25"
							viewBox="0 0 24 25"
							fill="none"
						>
							<path
								d="M21 12.6589H3M3 12.6589L8 17.6589M3 12.6589L8 7.65894"
								stroke="white"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
					<div className={[cl.slideNext, "arrow__next"].join(" ")}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="25"
							viewBox="0 0 24 25"
							fill="none"
						>
							<path
								d="M3 12.6589L21 12.6589M21 12.6589L16 7.65894M21 12.6589L16 17.6589"
								stroke="white"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
				</div>
			</Container>
		</div>
	);
});

export default TeamsBlock;