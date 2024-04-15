import React, {useContext} from 'react';
import Button from "react-bootstrap/Button";
import {removeTeam} from "../../../http/teamsApi";
import {ContextMain} from "../../../index";

const RemoveTeamItem = ({team_id}) => {
	
	const {galleryStore, teamsStore} = useContext(ContextMain);
	
	const handleRemoveItem = async () => {
		try {
			await removeTeam(team_id);
			teamsStore.removeTeam(team_id);
			galleryStore.callModalSuccess("Запись успешно удалена");
		} catch(e) {
			galleryStore.callModalError(`Что-то пошло не так, ${e?.message}`);
		}
	}
	
	return (
		<>
			<Button variant="outline-danger" onClick={handleRemoveItem}>Удалить</Button>
		</>
	);
};

export default RemoveTeamItem;