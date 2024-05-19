const Router = require('express');
const galleryBlockController = require('../controllers/gallleryBlockController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();

router.get('/', galleryBlockController.getAll);
router.post('/create', authMiddleware, galleryBlockController.create);
router.post('/remove/:id', authMiddleware, galleryBlockController.remove);

module.exports = router;