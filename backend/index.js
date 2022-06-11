require("dotenv").config(".env");
const express = require("express");
const cors = require("cors");

const app = express();

require("./config/database-config").initDB();

app.use(cors());
app.use(require("bodyparser").json());
app.use('/api', require('./api/index'));

app.listen(3000, () => {
  console.log(`server is running on http://localhost:3000`);
});
