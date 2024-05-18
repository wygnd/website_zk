const Router = require('express');
const gallleryBlockController = require('../controllers/gallleryBlockController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();
const apicache = require('apicache');

let cacheMiddleware = apicache.middleware;

router.get('/', cacheMiddleware('20 minutes'), gallleryBlockController.getAll);
router.post('/create', authMiddleware, gallleryBlockController.create);
router.post('/remove/:id', authMiddleware, gallleryBlockController.remove);

module.exports = router;