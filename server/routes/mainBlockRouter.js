const Router = require('express');
const mainBlockController = require('../controllers/mainBlockController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();
const apicache = require('apicache');

let cacheMiddleware = apicache.middleware;

router.post('/create', authMiddleware, mainBlockController.create)
router.post('/save', authMiddleware, mainBlockController.save)
router.post('/save/slides', authMiddleware, mainBlockController.saveSlides)
router.get('/', cacheMiddleware('20 minutes'), mainBlockController.getAll)
router.get('/:id', cacheMiddleware('20 minutes'), mainBlockController.getById)
router.post('/remove/:id', authMiddleware, mainBlockController.remove)

module.exports = router;