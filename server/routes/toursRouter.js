const Router = require('express');
const router = new Router();
const toursController = require('../controllers/toursController');
const authMiddleware = require('../middleware/authMiddleware');
const apicache = require('apicache');

let cacheMiddleware = apicache.middleware;

router.post('/create', authMiddleware, toursController.createTour);
router.post('/save', authMiddleware, toursController.saveTours);
router.get('/tour/:id', cacheMiddleware('20 minutes'), toursController.getOne);
router.get('/', cacheMiddleware('20 minutes'), toursController.getAll);
router.patch('/change', authMiddleware, toursController.changeTour);
router.delete('/remove/:id', authMiddleware, toursController.removeTour);

module.exports = router;