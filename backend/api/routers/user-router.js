const accrouter = require("express").Router();
const verifyToken = require("../../middleware/auth");
const {register, login, getProfile} = require("../../services/account-service");


accrouter.post("/register", (req, res) => {
  register(req, res);
});

accrouter.post("/login", (req, res) => {
  login(req, res);
});

accrouter.get("/", verifyToken, async (req, res) => {
  getProfile(req, res);
});

module.exports = accrouter;