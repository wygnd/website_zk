const Router = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const settingsController = require('../controllers/settingsController');
const router = new Router();

router.post('/create', authMiddleware, settingsController.create);
router.post('/', settingsController.findAll);
router.post('/setting', settingsController.findOne)
router.post('/change', authMiddleware, settingsController.changeOne)
router.post('/remove/:metaKey', authMiddleware, settingsController.remove);
router.post('/changeLogo/:id', authMiddleware, settingsController.changeLogo);
router.post('/changePhone', authMiddleware, settingsController.changePhone)

module.exports = router;