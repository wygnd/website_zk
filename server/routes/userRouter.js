const Router = require('express');
const UserController = require('../controllers/userController');
const router = new Router();
const authMIddleware = require('../middleware/authMiddleware');

router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.get('/auth', authMIddleware, UserController.check)

module.exports = router;