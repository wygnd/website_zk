const jwt = require('jsonwebtoken');
const {Tokens} = require('../models/models');

class TokenService {
	
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'});
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});
		return {
			accessToken,
			refreshToken
		}
	}
	
	generateAccessToken(payload) {
		return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'});
	}
	
	validateAccesToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
			return userData;
		} catch(error) {
			return null;
		}
	}
	
	validateRefreshToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
			return userData;
		} catch(error) {
			return null;
		}
	}
	
	async saveToken(userId, refreshToken) {
		const [tokenData, isCreated] = await Tokens.findOrCreate({
			where: {userId},
			defaults: {
				userId,
				refreshToken
			}
		});
		
		if(!isCreated) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}
		
		return tokenData;
	}
	
	async removeToken(refreshToken) {
		const tokenData = await Tokens.destroy({where: {refreshToken}})
		return tokenData;
	}
	
	async findToken(refreshToken) {
		const tokenData = await Tokens.findOne({where: {refreshToken}})
		return tokenData;
	}
}

module.exports = new TokenService();