const Router = require('express');
const router = new Router();
const galleryRouter = require('./galleryRouter');
const userRouter = require('./userRouter');
const mainBlockRouter = require('./mainBlockRouter');
const settingsRouter = require('./settingsRouter');
const toursRouter = require('./toursRouter');

router.use('/gallery', galleryRouter);
router.use('/mainBlock', mainBlockRouter);
router.use('/users', userRouter);
router.use('/settings', settingsRouter)
router.use('/tours', toursRouter)

module.exports = router;