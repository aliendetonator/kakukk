const getDB = require("../config/database-config").getDB;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  const {email, password, passwordRepeat, username} = req.body;

  if (email === null || password === null || username === null || passwordRepeat === null) {
    return res.status(400).send({
      message: "Hiányzó adat!",
      code: "missing_data",
    });
  }

  if (password !== passwordRepeat) {
    return res.status(400).send({
      message: "A két jelszó nem egyezik!",
      code: "password_not_match",
    });
  }

  const hash = bcrypt.hashSync(password, 10);

  let qr = `CALL felhasznalofeltoltes('${email}','${hash}','${username}')`;
  getDB().promise()
    .query(qr)
    .then((result) => {
      const token = jwt.sign({ data: result[0][0] }, process.env.SECRET);
      res.status(200).send({
        message: "Sikeres regisztráció!",
        code: "register_success",
        data: result[0][0],
        token: token
      });
    })
    .catch((err) => {
      console.log(err);
      // email létezik
      if (err.sqlMessage.toLowerCase().includes("'primary'")) {
        return res.status(400).send({
          message: "Ezzel az email címmel már van felhasználó!",
          code: "email_exists",
        });
      }

      // felhasználónév létezik
      if (err.sqlMessage.toLowerCase().includes("'felhasznalonev'")) {
        return res.status(400).send({
          message: "Ezzel a felhasználónévvel már van felhasználó!",
          code: "username_exists",
        });
      }

      res.status(400).send({
        message: "Ismeretlen hiba!",
        code: "unknown_error",
      });
    });
};

const login = (req, res) => {
  const {username, password} = req.body;

  if (username === null || password === null) {
    return res.status(400).send({
      message: "Hiányzó adat!",
      code: "missing_data",
    });
  }

  const usernameOrEmail = username.includes("@") ? "email" : "felhasznalonev";

  let qr = `select * from felhasznalo where ${usernameOrEmail} = '${username}'`;

  getDB().promise()
    .query(qr)
    .then((result) => {
      if (result[0].length === 0) {
        return res.status(400).send({
          message: "Nincs ilyen felhasználó!",
          code: "user_not_found",
        });
      }

      const pwMatch = bcrypt.compareSync(password, result[0][0].jelszo);
      if (!pwMatch) {
        return res.status(400).send({
          message: "Hibás jelszó!",
          code: "wrong_password",
        });
      }

      const token = jwt.sign({ data: result[0][0] }, process.env.SECRET);
      res.status(200).send({
        message: "Sikeres bejelentkezés!",
        code: "login_success",
        data: result[0][0],
        token: token
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

const getProfile = (req, res) => {
  res.status(200).send(req.user);
}

module.exports = {
  register,
  login,
  getProfile
};
