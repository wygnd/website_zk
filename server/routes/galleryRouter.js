const Router = require('express');
const GalleryController = require('../controllers/galleryController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();
const apicache = require('apicache');

let cacheMiddleware = apicache.middleware;

router.post('/create', authMiddleware, GalleryController.create);
router.get('/', cacheMiddleware('20 minutes'), GalleryController.getAll);
router.get('/:id', cacheMiddleware('20 minutes'), GalleryController.getOne);
router.delete('/remove/:id', authMiddleware, GalleryController.remove);

module.exports = router;