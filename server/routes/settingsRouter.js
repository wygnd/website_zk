const Router = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const settingsController = require('../controllers/settingsController');
const router = new Router();
const apicache = require('apicache');

let cacheMiddleware = apicache.middleware;

router.post('/create', authMiddleware, settingsController.create);
router.get('/before/:name', cacheMiddleware('20 minutes'), settingsController.findBeforeName);
router.get('/', cacheMiddleware('20 minutes'), settingsController.getAll)
router.get('/setting/:metaKey', cacheMiddleware('20 minutes'), settingsController.findOne)
router.post('/change', authMiddleware, settingsController.changeOne)
router.delete('/remove/:metaKey', authMiddleware, settingsController.remove);
router.post('/changeLogo/:id', authMiddleware, settingsController.changeLogo);
router.post('/changePhone', authMiddleware, settingsController.changePhone)

module.exports = router;