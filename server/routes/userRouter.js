const Router = require('express');
const UserController = require('../controllers/userController');
const router = new Router();
const { body } = require('express-validator');
const authMIddleware = require('../middleware/authMiddleware');

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 32 }),
    UserController.registration)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/auth', authMIddleware, UserController.check)

module.exports = router;