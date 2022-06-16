const router = require('express').Router();

router.use('/user', require('./routers/user-router'));
router.use('/leaderboard', require('./routers/leaderboard-router'));
router.use('/game', require('./routers/game-router'));
router.use('/statistics', require('./routers/statistics-router'))

module.exports = router;