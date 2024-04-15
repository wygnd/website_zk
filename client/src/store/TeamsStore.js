import {makeAutoObservable} from "mobx";

export default class TeamsStore {
	constructor() {
		this._teams = [];
		makeAutoObservable(this);
	}
	
	get teams() {
		return this._teams;
	}
	
	setTeams(teams) {
		this._teams = teams;
	}
	
	addTeam(team_item) {
		this._teams.push(team_item);
	}
	
	removeTeam(team_id) {
		this._teams = this._teams.filter(t => t.id !== team_id);
	}
	
	changeTeam(team_id, title, description, image_id) {
		let team_item = this._teams.find(t => t.id === team_id);
		team_item.title = title;
		team_item.description = description;
		team_item.image_id = image_id
	}
}