const Router = require('express');
const router = new Router();
const { check } = require('express-validator');
const toursController = require('../controllers/toursController');

router.post('/create', toursController.create);
router.get('/', toursController.getAll);

module.exports = router;