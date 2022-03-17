import express from 'express'
import 'dotenv/config'
const app = express()
const port = process.env.PORT

app.use(express.json());
app.get('/', (req, res) => {
  res.send("hi")
})

app.use(function (req, res) {
  res.status(404)
  res.send("404")
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})