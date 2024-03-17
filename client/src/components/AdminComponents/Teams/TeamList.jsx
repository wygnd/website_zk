import React, {useEffect, useState} from 'react';
import ListGroup from "react-bootstrap/ListGroup";
import {getTeams} from "../../../http/teamsApi";
import TeamListItem from "./TeamListItem";

const TeamList = () => {
	
	const [teams, setTeams] = useState([]);
	
	const getDataTeams = async () => {
		const data = await getTeams();
		setTeams(data);
	}
	
	useEffect(() => {
		getDataTeams();
	}, []);
	
	return (
		<>
			{teams.length !== 0 &&
				<ListGroup className="d-grid col-3 mb-4" as="ul">
					{teams.map(team =>
						<TeamListItem
							key={team.id}
							team_id={team.id}
							title={team.title}
							description={team.description}
							image_id={team.image_id}
						/>
					)}
				</ListGroup>
			}
		</>
	);
};

export default TeamList;