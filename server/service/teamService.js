const {Teams} = require('../models/models');
const ApiError = require("../error/ApiError");

class TeamService {
	async getTeams() {
		return await Teams.findAll();
	}
	
	async getTeamById(team_id) {
		const candidate = await Teams.findByPk(team_id);
		
		if(!candidate) {
			throw ApiError.BadRequest("Записи не найдено");
		}
		
		return candidate;
	}
	
	async createTeam(image_id, title, description, order) {
		return await Teams.create({
			image_id,
			title,
			description,
			order
		});
	}
	
	async removeTeam(team_id) {
		const candidate = await Teams.findByPk(team_id);
		
		if(!candidate) {
			throw ApiError.BadRequest("Записи не найдено");
		}
		
		return await candidate.destroy();
	}
	
	async changeTeamItem(id, options) {
		const candidate = await Teams.findByPk(id);
		
		if(!candidate) {
			throw ApiError.BadRequest("Записи не найдено");
		}
		
		console.log(options)
		
		return await candidate.update(options)
	}
}

module.exports = new TeamService();