const teamService = require('../service/teamService');

class TeamController {
	
	async getTeam(req, res, next) {
		try {
			const data = await teamService.getTeams();
			return res.json(data);
		} catch(e) {
			next(e);
		}
	}
	
	async getTeamById(req, res, next) {
		try {
			const {team_id} = req.params;
			const data = await teamService.getTeamById(team_id);
			return res.json(data);
		} catch(e) {
			next(e);
		}
	}
	
	async createTeamItem(req, res, next) {
		try {
			const {image_id, title, description, order} = req.body;
			const data = await teamService.createTeam(image_id, title, description, order);
			return res.json(data);
		} catch(e) {
			next(e);
		}
	}
	
	async removeTeamItem(req, res, next) {
		try {
			const {team_id} = req.params;
			const data = await teamService.removeTeam(team_id);
			return res.json(data);
		} catch(e) {
			next(e);
		}
	}
	
	async changeTeamItem(req, res, next) {
		try {
			const {id, options} = req.body;
			const data = await teamService.changeTeamItem(id, options);
			return res.json(data);
		} catch(e) {
			next(e);
		}
	}
	
	async saveTeams(req, res, next) {
		try {
			const {teams} = req.body;
			await Promise.all(teams.map(async (team) => {
				await teamService.changeTeamItem(team.id, {order: team.order});
			}))
			return res.json({status: true});
		} catch(e) {
			next(e);
		}
	}
}

module.exports = new TeamController();