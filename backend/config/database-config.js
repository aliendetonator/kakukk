const clc = require("cli-color");
const mysql = require("mysql2");

const db_config = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
};

var db;

const handleDisconnect = () => {
  db = mysql.createConnection(db_config);

  db.connect((err) => {
    if (err) {
      console.log(clc.red("Database connection failed! Retrying..."));
      return setTimeout(handleDisconnect, 2000);
    }
    console.log(clc.green("Database connected!"));
  });

  db.on("error", (err) => {
    if (err.code === "ECONNRESET") {
      handleDisconnect();
    }
  });
}

const getDB = () => {
  return db;
}

const initDB = () => {
    handleDisconnect();
}

module.exports = {
  initDB,
  getDB
};
