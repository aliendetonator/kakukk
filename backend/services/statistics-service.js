const getDB = require("../config/database-config").getDB;

const statistics = (req, res) => {
  const data = req.body;

  const table = data.id ? data.id : "farkas";
  const user = data.user ? data.user : "userame";
  if (table === "felhasznalo") {
    table = "farkas";
  }

  let qr = `CALL getUserGames${table}('${user}');`;
  getDB()
    .promise()
    .query(qr)
    .then((result) => {
      res.status(200).send({
        data: result[0][0],
      }); 
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Szerver hiba!",
        code: "server_error",
      });
    });
};

module.exports = statistics;
