const Router = require('express');
const router = new Router();
const galleryRouter = require('./galleryRouter');
const userRouter = require('./userRouter');

router.use('/gallery', galleryRouter);
router.use('/user', userRouter);

module.exports = router;