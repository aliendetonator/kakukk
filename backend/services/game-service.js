const getDB = require("../config/database-config").getDB;

const getLobby = (req, res) => {
  res.set("Cache-Control", "no-store");

  const lobby = req.query.lobby;
  const user = req.query.user;

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

const leaveLobby = (req, res) => {
    const username = req.user.felhasznalonev;

    const qr = `CALL RemoveFromLobby('${username}')`;
    getDB().promise()
        .query(qr)
        .then((result) => {
            res.status(200).send({
                message: "Kiléptél a lobbyból!",
                code: "left_the_lobby",
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({
                message: "Ismeretlen hiba!",
                code: "unknown_error",
            });
        });
}

const joinLobby = (req, res) => {
    const username = req.user.felhasznalonev;

    const qr = `CALL JoinLobby('${username}')`;
    getDB().promise()
        .query(qr)
        .then((result) => {
            res.status(200).send({
                message: "Csatlakoztál a lobbyhoz!",
                code: "joined_the_lobby",
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({
                message: "Ismeretlen hiba!",
                code: "unknown_error",
            });
        });
}

const checkChange = (lobby, playerCount) => {
  const qr = `CALL GetLobby('${lobby}')`;
  getDB()
    .promise()
    .query(qr)
    .then((result) => {
      resp = {
        data: result[0][0],
        changed: false,
        error: false
      };
      if (result[0][0].length !== playerCount) {
        resp.changed = true;
      }
      return resp;
    })
    .catch((err) => {
      console.log(err);
      return {
        error: true
      };
    });
};

const getChanges = (req, res) => {
  res.set("Cache-Control", "no-store");

  const { lobby, playerCount } = req.body;
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

  const change = checkChange(lobby, playerCount);
  if (change.error) return res.status(400).send({ code: "unknown_error" });
  if (!change.changed) return res.status(200).send({ code: "no_changes" });

  res.status(200).send({
    message: "A lobby frissült!",
    code: "lobby_updated",
    data: change.data,
  });
};

module.exports = {
  getLobby,
  leaveLobby,
  joinLobby,
  getChanges,
};
