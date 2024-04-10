import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {ContextMain} from "../../index";
import {getTeams} from "../../http/teamsApi";
import Container from "../Container/Container";
import {Swiper, SwiperSlide} from "swiper/react";
import TeamItem from "./TeamItem";
import styles from "./TeamsBlock.module.scss";

const TeamsBlock = observer(() => {
	const {teamsStore} = useContext(ContextMain);
	
	useEffect(() => {
		getTeams().then(res => {
			teamsStore.setTeams(res);
		});
	}, [teamsStore]);
	
	if(teamsStore.teams.length === 0) {
		return null;
	}
	
	return (
		<div id="teams-block" className={styles.teamsBlock}>
			<Container>
				<div className="teams-holder">
					<Swiper
						slidesPerView={4}
						spaceBetween={30}
					>
						{teamsStore.teams.map((team) => (
							<SwiperSlide key={team.id}>
								<TeamItem team={team}/>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</Container>
		</div>
	);
});

export default TeamsBlock;