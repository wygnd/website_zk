const Router = require('express');
const router = new Router();
const galleryRouter = require('./galleryRouter');
const userRouter = require('./userRouter');
const mainBlockRouter = require('./mainBlockRouter');
const settingsRouter = require('./settingsRouter');
const toursRouter = require('./toursRouter');
const galleryBlockRouter = require('./galleryBlockRouter');
const teamRouter = require('./teamRouter');
const cacheRouter = require('./cacheRouter');

router.use('/gallery', galleryRouter);
router.use('/mainBlock', mainBlockRouter);
router.use('/users', userRouter);
router.use('/settings', settingsRouter);
router.use('/tours', toursRouter);
router.use('/galleryBlock', galleryBlockRouter);
router.use('/teams', teamRouter);
router.use('/cache', cacheRouter);

module.exports = router;