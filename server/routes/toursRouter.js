const Router = require('express');
const router = new Router();
const toursController = require('../controllers/toursController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, toursController.createTour);
router.post('/save', authMiddleware, toursController.saveTours);
router.get('/tour/:id', toursController.getOne);
router.get('/', toursController.getAll);
router.patch('/change', authMiddleware, toursController.changeTour);
router.delete('/remove/:id', authMiddleware, toursController.removeTour);

module.exports = router;