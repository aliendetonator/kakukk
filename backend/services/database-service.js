const db = require("../config/database-config").getDB();
const bcrypt = require("bcrypt");

const register = (req, res) => {
  const data = req.body;

  const email = data.email;
  const pw = data.password;
  const pwRepeat = data.passwordRepeat;
  const username = data.username;

  if (email === null || pw === null || username === null || pwRepeat === null) {
    return res.status(400).send({
      message: "Hiányzó adat!",
      code: "missing_data",
    });
  }

  if (pw !== pwRepeat) {
    return res.status(400).send({
      message: "A két jelszó nem egyezik!",
      code: "password_not_match",
    });
  }

  const hash = bcrypt.hashSync(pw, 10);

  let qr = `CALL felhasznalofeltoltes('${email}','${hash}','${username}')`;
  db.promise()
    .query(qr)
    .then((result) => {
      res.status(200).send({
        message: "Sikeres regisztráció!",
        code: "register_success",
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
  const data = req.body;

  const username = data.username;
  const pw = data.password;

  if (username === null || pw === null) {
    return res.status(400).send({
      message: "Hiányzó adat!",
      code: "missing_data",
    });
  }

  const usernameOrEmail = username.includes("@") ? "email" : "felhasznalonev";

  let qr = `select * from felhasznalo where ${usernameOrEmail} = '${username}'`;

  db.promise()
    .query(qr)
    .then((result) => {
      if (result[0].length === 0) {
        return res.status(400).send({
          message: "Nincs ilyen felhasználó!",
          code: "user_not_found",
        });
      }

      const pwMatch = bcrypt.compareSync(pw, result[0][0].jelszo);
      if (!pwMatch) {
        return res.status(400).send({
          message: "Hibás jelszó!",
          code: "wrong_password",
        });
      }

      res.status(200).send({
        message: "Sikeres bejelentkezés!",
        code: "login_success",
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

module.exports = {
  register,
  login,
};
