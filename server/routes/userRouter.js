const Router = require('express');
const UserController = require('../controllers/userController');
const router = new Router();
const { check } = require('express-validator');
const authMIddleware = require('../middleware/authMiddleware');

router.post('/registration', [
    check('email', 'Поле email не должно быть пустым').notEmpty(),
    check('password', 'Поле password не должно быть пустым').notEmpty(),
    check('password', 'Пароль должен быть больше 4 символов').isLength({ min: 4 }),
], UserController.registration)
router.post('/login', [
    check('email', 'Поле email не должно быть пустым').notEmpty(),
    check('password', 'Поле password не должно быть пустым').notEmpty(),
], UserController.login)
router.get('/auth', authMIddleware, UserController.check)

module.exports = router;