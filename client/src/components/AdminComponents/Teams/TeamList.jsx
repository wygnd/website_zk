import React, {useContext, useEffect, useState} from 'react';
import {getTeams, saveTeam} from "../../../http/teamsApi";
import TeamListItem from "./TeamListItem";
import "./Team.scss";
import {ContextMain} from "../../../index";
import AddNewTeamItem from "./AddNewTeamItem";
import {observer} from "mobx-react-lite";
import {Reorder} from 'framer-motion';

const TeamList = observer(() => {
	
	const {teamsStore} = useContext(ContextMain);
	const [teams, setTeams] = useState([]);
	
	useEffect(() => {
		if(teamsStore.teams.length === 0) {
			getTeams().then(data => {
				teamsStore.setTeams(data);
				setTeams(data);
			});
		} else {
			setTeams(teamsStore.teams);
		}
	}, [teamsStore.teams]);
	
	if(teamsStore.teams.length === 0) {
		return null;
	}
	
	const handleDragEnd = async () => {
		teams.map((t, index) => {
			t.order = index;
		})
		teamsStore.setTeams(teams);
		try {
			await saveTeam(teams);
		} catch(err) {
			console.log(err);
		}
	}
	
	return (
		<>
			<div className="teams-holder__header">
				<AddNewTeamItem/>
			</div>
			<Reorder.Group
				axis="y"
				values={teams}
				onReorder={setTeams}
				className="teams-holder"
				onPanEnd={handleDragEnd}
			>
				{teams.map((team, index) =>
					<TeamListItem
						key={team.id}
						team={team}
						index={index}
					/>
				)}
			</Reorder.Group>
		</>
	);
});

export default TeamList;