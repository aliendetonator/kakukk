const router = require('express').Router();

router.use('/user', require('./routers/user-router'));
router.use('/leaderboard', require('./routers/leaderboard-router'));
router.use('/game', require('./routers/game-router'));

module.exports = router;