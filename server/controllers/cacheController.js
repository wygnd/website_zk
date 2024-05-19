const ApiCacheModule = require('apicache');


class CacheController {
	
	async clearCacheIndex(req, res, next) {
		try {
			res.json({
				cache_data: ApiCacheModule.clear(),
				status: true,
			});
		} catch(err) {
			next(err);
		}
	}
	
	async getCacheIndex(req, res, next) {
		try {
			return res.json(ApiCacheModule.getIndex());
		} catch(err) {
			next(err);
		}
	}
}

module.exports = new CacheController();