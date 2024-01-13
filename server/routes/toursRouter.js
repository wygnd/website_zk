const Router = require('express');
const router = new Router();
const toursController = require('../controllers/toursController');

router.post('/create', toursController.createTour);
router.post('/tour/:id', toursController.getOne);
router.get('/', toursController.getAll);
router.post('/change', toursController.changeTour);
router.post('/remove/:id', toursController.removeTour);

module.exports = router;