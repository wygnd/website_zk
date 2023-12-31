const Router = require('express');
const UserController = require('../controllers/userController');
const router = new Router();
const { body } = require('express-validator');
const authMIddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 32 }),
    UserController.registration)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/refresh', UserController.refresh);
router.get('/', authMIddleware, userController.getAll)

module.exports = router;