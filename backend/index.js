const express = require('express');
const session = require('express-session');
const bodyparser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const clc = require('cli-color');

const mysql = require("mysql2");



const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(session({
    secret: 'ez nem tom mi xd',
    resave: false,
    saveUninitialized: true
}));

//adatbázis csatolása

const db_config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'webii',
    port: '3306'
};
var db;

function handleDisconnect() {
    db = mysql.createConnection(db_config);

    db.connect(err => {
        if (err) {
            console.log(clc.red('Database connection failed! Retrying...'));
            setTimeout(handleDisconnect, 2000);
        } else {
            console.log(clc.green('Database connected!'));
        }
    })

    db.on('error', err => {
        if (err.code === 'ECONNRESET') {
            handleDisconnect();
        }
    });
}
handleDisconnect();

//minden adat kiszedése egy táblából
app.get('/user', (req, res) => {
    let qr = `SELECT * FROM felhasznalo`;

    db.query(qr, (err, result) => {
        if (err) {
            return console.log(err, 'error!');
        }

        if (result.length > 0) {
            return res.send({
                message: 'all user data',
                data: result
            })
        }
        res.send({
            message: 'data not found'
        })

    })
})

//egy adat kiszedése
app.get('/user/:id', (req, res) => {
    let getID = req.params.id;
    let qr = `select * from felhasznalo where id= ${getID}`
    db.query(qr, (err, result) => {
        if (err) return console.log(err);

        if (result.length > 0) {
            return res.send({
                message: 'get one data',
                data: result
            })
        }
        res.send({
            message: 'data not found'
        })
    })
})

//regisztráció
app.post('/register', (req, res) => {
    const data = req.body;
    const response = require('./dbFunctions.js').register(db, data);
    res.send(response);
})

//adatok módosítása
app.put('/user/:id', (req, res) => {
    console.log(req.body, 'updateData');

    let getID = req.params.id;

    let fullName = req.body.fullname;
    let eMail = req.body.email;
    let ph = req.body.phone;

    let qr = `UPDATE felhasznalo SET fullname = '${fullName}', email = '${eMail}', phone = '${ph}' WHERE id = '${getID}'`;

    db.query(qr, (err, result) => {
        if (err) return console.log(err);

        res.send({
            message: 'data updated'
        })
    })

})

//adat törlése
app.delete('/user/:id', (req, res) => {
    let getID = req.params.id;

    let qr = `DELETE FROM felhasznalo WHERE id = ${getID}`;

    db.query(qr, (err, result) => {
        if (err) return console.log(err);

        res.send({
            message: 'data Deleted'
        })
    })
})

app.get('/', (req, res) => {
    if(req.session.page_views){
        req.session.page_views++;
        return res.send(`You visited this page ${req.session.page_views} times`);
    }
    req.session.page_views = 1;
    res.send('Welcome to the page!');
})

//szerver futtatása
app.listen(3000, () => {
    console.log(`server is running on http://localhost:3000`);
})