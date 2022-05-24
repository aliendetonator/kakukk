const bcrypt = require("bcrypt");

const register = (db, data) => {
  const email = data.email;
  const pw = data.password;
  const pwRepeat = data.passwordRepeat;
  const username = data.username;

  return new Promise((resolve, reject) => {
    //if(email == null || pw == null || username == null || pwRepeat == null) {
    if (email == null || pw == null || username == null) {
      resolve({
        message: "Hiányzó adat!",
        code: "missing_data",
        status: 100,
      });
    }

    // if(pw != pwRepeat) {
    //     return {
    //         message: 'A két jelszó nem egyezik!',
    //         code: 'password_not_match'
    //     }
    // }
    const hash = bcrypt.hashSync(pw, 10);

    let qr = `CALL felhasznalofeltoltes('${email}','${hash}','${username}')`;
    db.query(qr, (err, result) => {
      var resp = {
        message: "Sikeres regisztráció!",
        code: "register_success",
        status: 0,
      };

      if (err) {
        resp = {
          message: "Ismeretlen hiba!",
          code: "unknown_error",
          status: 99,
        };

        // felhasználónév létezik
        if (err.sqlMessage.toLowerCase().includes("'felhasznalonev'")) {
          resp = {
            message: "Ezzel a felhasználónévvel már van felhasználó!",
            code: "username_exists",
            status: 2,
          };
        }

        // email létezik
        if (err.sqlMessage.toLowerCase().includes("'primary'")) {
          resp = {
            message: "Ezzel az email címmel már van felhasználó!",
            code: "email_exists",
            status: 1,
          };
        }
      }

      resolve(resp);
    });
  });
};

const login = (db, data) => {
  const username = data.username;
  const pw = data.password;

  return new Promise((resolve, reject) => {
    if (username == null || pw == null) {
      resolve({
        message: "Hiányzó adat!",
        code: "missing_data",
        status: 100,
      });
    }

    const usernameOrEmail = username.includes("@") ? "email" : "felhasznalonev";

    let qr = `select * from felhasznalo where ${usernameOrEmail} = '${username}'`;

    db.query(qr, (err, result) => {
      var resp = {
        message: "Sikeres bejelentkezés!",
        code: "login_success",
        status: 0,
      };

      if (err) {
        resp = {
          message: "Ismeretlen hiba!",
          code: "unknown_error",
          status: 99,
        };
      }
      if (result?.length == 0) {
        resp = {
          message: "Nincs ilyen felhasználó!",
          code: "user_not_found",
          status: 1,
        };
      }
      if (resp.status == 0) {
        const pwMatch = bcrypt.compareSync(pw, result[0].jelszo);
        if (!pwMatch) {
          resp = {
            message: "Hibás jelszó!",
            code: "wrong_password",
            status: 2,
          };
        }
      }
      resolve(resp);
    });
  });
};

const leaderboard = (db, data) => {
  const table = data.table ? data.table : "farkas";
  const limit = data.limit ? data.limit : 10;
  const offset = data.offset ? data.offset : 0;
  
  if (table === "felhasznalo") {
    table = "farkas";
  }
  
  return new Promise((resolve, reject) => {
    let qr = `CALL get${table}top(${limit}, ${offset});`;
    db.query(qr, (err, result) => {
      if (err) {
        return resolve({
          message: "Ismeretlen hiba!",
          code: "unknown_error",
          status: 99,
        });
      }
      resolve({
        data: result[0],
      });
    });
  });
};

module.exports = {
  register,
  login,
  leaderboard,
};
