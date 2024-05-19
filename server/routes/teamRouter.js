const Router = require('express');
const router = new Router();
const teamController = require('../controllers/teamController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', teamController.getTeam);
router.get('/:team_id', teamController.getTeamById);
router.post('/create', authMiddleware, teamController.createTeamItem);
router.patch('/change', authMiddleware, teamController.changeTeamItem);
router.delete('/remove/:team_id', authMiddleware, teamController.removeTeamItem);
router.post('/save', authMiddleware, teamController.saveTeams);

module.exports = router;