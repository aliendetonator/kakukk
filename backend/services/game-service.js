const getDB = require("../config/database-config").getDB;
const clc = require("cli-color");

const deleteLobbies = () => {
  var deleteInterval = setInterval(() => {
    const qr = `CALL DeleteLobbies()`;
    getDB()
      .promise()
      .query(qr)
      .then((result) => {
        console.log(clc.green("Lobbies deleted!"));
        clearTimeout(deleteInterval);
      })
      .catch((err) => {
        console.log(clc.red("Error deleting lobbies!"));
      });
  }, 2000);
};
const getLobby = (req, res) => {
  res.set("Cache-Control", "no-store");

  const lobby = req.query.lobby;
  const user = req.query.user || req.user.felhasznalonev;

  let qr = `CALL GetLobby('${lobby}')`;

  undef_check: {
    if (lobby === undefined) {
      if (user !== undefined) {
        qr = `CALL GetLobbyByUsername('${user}')`;
        break undef_check;
      }
      return res.status(400).send({
        error: "Nem adtál meg lobbyt!",
        code: "lobby_not_defined",
      });
    }
  }

  getDB()
    .promise()
    .query(qr)
    .then((result) => {
      if (result[0][0].length === 0) {
        return res.status(400).send({
          error: "Nincs ilyen lobby!",
          code: "lobby_not_found",
        });
      }

      console.log(result[0][0]);

      res.status(200).send({
        message: "Sikeres kérés!",
        code: "success",
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

const leaveLobby = (req, res, sendres) => {
  const username = req.user.felhasznalonev;
  if (sendres === undefined) sendres = true;
  const qr = `CALL RemoveFromLobby('${username}')`;
  getDB()
    .promise()
    .query(qr)
    .then((result) => {
      if (!sendres) return true;
      res.status(200).send({
        message: "Kiléptél a lobbyból!",
        code: "left_the_lobby",
      });
    })
    .catch((err) => {
      console.log(err);
      if (!sendres) return false;
      res.status(400).send({
        message: "Ismeretlen hiba!",
        code: "unknown_error",
      });
    });
};

const lobbyExists = (lobby) => {
  const qr = `CALL GetLobby('${lobby}')`;
  return new Promise((resolve, reject) => {
    return getDB()
      .promise()
      .query(qr)
      .then((result) => {
        if (result[0][0].length === 0) return false;
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      })
      .then((result) => {
        if (result) {
          resolve(result);
        }
        reject(result);
      });
  });
};

const joinLobby = (req, res, lobby, create) => {
  const username = req.user.felhasznalonev;
  lobby = lobby || req.query.lobby;

  if (lobby === undefined) {
    return res.status(400).send({
      message: "Nem adtál meg lobbyt!",
      code: "lobby_not_defined",
    });
  }

  
  const join = () => {
    const qr = `CALL JoinLobby('${username}', '${lobby}')`;
    getDB()
    .promise()
    .query(qr)
    .then((result) => {
      res.status(200).send({
        message: "Csatlakoztál a lobbyhoz!",
        code: "joined",
      });
    })
    .catch((err) => {
      if (err.code === "ER_DUP_ENTRY") {
        leaveLobby(req, res, false);
        return joinLobby(req, res, lobby);
      }
      console.log(err);

      res.status(400).send({
        message: "Ismeretlen hiba!",
        code: "unknown_error",
      });
    });
  }

  if(create){
    return join();
  }
  
  lobbyExists(lobby).then((exists) => {
    join();
  }).catch(() => {
    return res.status(400).send({
      message: "Nincs ilyen lobby!",
      code: "lobby_not_found",
    });
  });


  
};

const checkChange = (lobby, playerCount) => {
  const qr = `CALL GetLobby('${lobby}')`;
  return new Promise((resolve, reject) => {
    return getDB()
    .promise()
    .query(qr)
    .then((result) => {
        resp = {
          changed: false,
          error: false,
        };
        if (result[0][0].length !== playerCount) {
          resp.changed = true;
          resp.data = result[0][0];
        }
        return resp;
      })
      .catch((err) => {
        console.log(err);
        return {
          error: true,
        };
      })
      .then((result) => {
        if (result.error) {
          reject(result);
        }
        resolve(result);
      });
  });
};

const getChanges = (req, res) => {
  res.set("Cache-Control", "no-store");

  const lobby = req.body.lobby;
  const playerCount = req.body.playerCount;
  const username = req.user.felhasznalonev;

  if (
    lobby === undefined ||
    playerCount === undefined ||
    username === undefined
  ) {
    return res.status(400).send({
      error: "Hiányzó paraméterek!",
      code: "missing_data",
    });
  }

  // console.log(lobby, playerCount, username);

  checkChange(lobby, playerCount)
    .then((result) => {
      // console.log(result)
      if (!result.changed) return res.status(200).send({ code: "no_changes" });
      res.status(200).send({
        message: "A lobby frissült!",
        code: "lobby_updated",
        data: result.data,
      });
    })
    .catch((err) => {
      console.log(result);
      res.status(400).send({ code: "unknown_error" });
    });
};

const lobbyAvailable = async (lobby) => {
  const qr = `CALL GetLobby('${lobby}')`;

  // available var with a setter and default value false

  const promise = new Promise((resolve, reject) => {
    getDB()
      .promise()
      .query(qr)
      .then((result) => {
        if (result[0][0].length === 0) {
          return true;
        }
        return false;
      })
      .catch((err) => {
        if (err.code === "ER_DUP_ENTRY") {
          leaveLobby(req, res, false);
          createLobby(req, res);
          return false;
        }
        console.log(err);
        return false;
      })
      .then((available) => {
        if (available) {
          resolve(true);
        }
        reject(false);
      });
  });

  const getResult = await promise;
  return getResult;
};

const generateLobbyName = () => {
  const random = (Math.random() + 1).toString(36);
  return random.substring(random.length - 6);
};

const createLobby = (req, res) => {
  var lobby = generateLobbyName();

  lobbyAvailable(lobby)
    .then((available) => {
      return joinLobby(req, res, lobby, true);
    })
    .catch((err) => {
      console.log(err)
      res.status(400).send({
        error: "Nem sikerült létrehozni a lobbyt!",
        code: "lobby_creation_failed",
      });
    });
};

module.exports = {
  getLobby,
  leaveLobby,
  joinLobby,
  getChanges,
  createLobby,
  deleteLobbies,
};
