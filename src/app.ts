import 'dotenv/config'
import express from 'express'
import React from 'react'
import ReactDOM from 'react-dom'
import path from 'path'
const app = express()
const port = process.env.PORT

app.use(express.static("public"));
// app.get("/", (req, res) => {
//     res.send(ReactDOM.render())
//     // res.sendFile(path.join(__dirname, "public", "index.html"));
// });

app.use(function (req, res) {
    res.status(404)
    res.send("404")
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`)
})