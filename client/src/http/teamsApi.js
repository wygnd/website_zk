import {$api, $apiAuth} from ".";

export async function getTeams() {
	try {
		const response = await $api.get('/teams');
		return response.data;
	} catch(e) {
		throw e?.message;
	}
}

export async function getTeamById(team_id) {
	try {
		const response = await $api.get(`/teams/${team_id}`);
		return response.data;
	} catch(e) {
		throw e?.message;
	}
}

export async function createTeam(options) {
	try {
		const response = await $apiAuth.post(`/teams/create`, {
			...options
		});
		return response.data;
	} catch(e) {
		throw e?.message;
	}
}

export async function removeTeam(team_id) {
	try {
		const response = await $apiAuth.delete(`/teams/remove/${team_id}`);
		return response.data;
	} catch(e) {
		throw e?.message;
	}
}

export async function changeTeam(id, options) {
	try {
		const response = await $apiAuth.patch(`/teams/change`, {
			id,
			options
		});
		return response.data;
	} catch(e) {
		throw e?.message;
	}
}

export async function saveTeam(teams) {
	try {
		const response = await $apiAuth.post(`/teams/save`, {
			teams
		})
	} catch(e) {
		throw e?.message;
	}
}