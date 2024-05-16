const Router = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const settingsController = require('../controllers/settingsController');
const router = new Router();

router.post('/create', authMiddleware, settingsController.create);
router.get('/before/:name', settingsController.findBeforeName);
router.get('/', settingsController.getAll)
router.get('/setting/:metaKey', settingsController.findOne)
router.post('/change', authMiddleware, settingsController.changeOne)
router.delete('/remove/:metaKey', authMiddleware, settingsController.remove);
router.post('/changeLogo/:id', authMiddleware, settingsController.changeLogo);
router.post('/changePhone', authMiddleware, settingsController.changePhone)

module.exports = router;