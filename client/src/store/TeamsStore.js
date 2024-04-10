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
}