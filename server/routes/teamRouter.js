const Router = require('express');
const router = new Router();
const teamController = require('../controllers/teamController');
const authMiddleware = require('../middleware/authMiddleware');
const apicache = require('apicache');

let cacheMiddleware = apicache.middleware;

router.get('/', cacheMiddleware('20 minutes'), teamController.getTeam);
router.get('/:team_id', cacheMiddleware('20 minutes'), teamController.getTeamById);
router.post('/create', authMiddleware, teamController.createTeamItem);
router.patch('/change', authMiddleware, teamController.changeTeamItem);
router.delete('/remove/:team_id', authMiddleware, teamController.removeTeamItem);
router.post('/save', authMiddleware, teamController.saveTeams);

module.exports = router;