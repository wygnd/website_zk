const Router = require('express');
const router = new Router();
const galleryRouter = require('./galleryRouter');
const userRouter = require('./userRouter');
const mainBlockRouter = require('./mainBlockRouter');
const settingsRouter = require('./settingsRouter');

router.use('/gallery', galleryRouter);
router.use('/mainBlock', mainBlockRouter);
router.use('/users', userRouter);
router.use('/settings', settingsRouter)

module.exports = router;