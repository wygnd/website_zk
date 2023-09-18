const jwt = require('jsonwebtoken');
const { Tokens } = require('../models/models');

class TokenService {

    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const [tokenData, isCreated] = await Tokens.findOrCreate({
            where: { userId },
            defaults: {
                userId,
                refreshToken
            }
        });

        if (!isCreated) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        return tokenData;
    }

    async removeToken(refreshToken) {
        const tokenData = await Tokens.destroy({ where: { refreshToken } })
        return tokenData;
    }
}

module.exports = new TokenService();