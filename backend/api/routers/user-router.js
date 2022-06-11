const accrouter = require("express").Router();
const {register, login} = require("../../services/database-service");

accrouter.post("/register", (req, res) => {
  register(req, res);
});

accrouter.post("/login", (req, res) => {
  login(req, res);
});

module.exports = accrouter;