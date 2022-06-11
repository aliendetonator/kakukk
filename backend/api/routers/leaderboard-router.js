const lbrouter = require("express").Router();
const leaderboard = require("../../services/leaderboard-service");

lbrouter.post("/", (req, res) => {
  leaderboard(req, res);
});

module.exports = lbrouter;
