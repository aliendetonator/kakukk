const strouter = require("express").Router();
const statistics = require("../../services/statistics-service");

strouter.post("/", (req, res) => {
  statistics(req, res);
});

module.exports = strouter;