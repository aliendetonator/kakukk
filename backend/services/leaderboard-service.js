const getDB = require("../config/database-config").getDB;

const leaderboard = (req, res) => {
  const data = req.body;

  const table = data.table ? data.table : "farkas";
  const limit = data.limit ? data.limit : 10;
  const offset = data.offset ? data.offset : 0;

  if (table === "felhasznalo") {
    table = "farkas";
  }

  let qr = `CALL get${table}top(${limit}, ${offset});`;
  getDB().promise()
    .query(qr)
    .then((result) => {
      res.status(200).send({
        data: result[0][0],
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({
        message: "Ismeretlen hiba!",
        code: "unknown_error",
      });
    });
};

module.exports = leaderboard;
