const Router = require('express');
const CacheController = require('../controllers/cacheController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();

router.get('/clear', authMiddleware, CacheController.clearCacheIndex);
router.get('/index', CacheController.getCacheIndex);

module.exports = router;