const router = require('express').Router();

router.use('/user', require('./routers/user-router'));
router.use('/leaderboard', require('./routers/leaderboard-router'));

module.exports = router;