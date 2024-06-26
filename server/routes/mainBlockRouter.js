const Router = require('express');
const mainBlockController = require('../controllers/mainBlockController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();

router.post('/create', authMiddleware, mainBlockController.create)
router.post('/save', authMiddleware, mainBlockController.save)
router.post('/save/slides', authMiddleware, mainBlockController.saveSlides)
router.get('/',  mainBlockController.getAll)
router.get('/:id',  mainBlockController.getById)
router.post('/remove/:id', authMiddleware, mainBlockController.remove)

module.exports = router;