const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({
      message: "Nincs jogosultságod!",
      code: "forbidden",
    });
  }
  jwt.verify(req.headers.authorization, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Nincs jogosultságod!",
        code: "forbidden",
      });
    }
    req.user = decoded.data;
    next();
  });
}

module.exports = verifyToken;
