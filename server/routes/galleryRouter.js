const Router = require('express');
const GalleryController = require('../controllers/galleryController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();

router.post('/create', GalleryController.create);
router.get('/', GalleryController.getAll);
router.get('/:id', GalleryController.getOne);
router.delete('/remove/:id', authMiddleware, GalleryController.remove);

module.exports = router;