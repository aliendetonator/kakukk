const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt')

const mysql = require("mysql2");


const app = express();

app.use(cors());
app.use(bodyparser.json());

//adatbázis csatolása

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'webii',
    port: '3306'
})

// adatbázis kapcsolat ellenőrzése

db.connect(err => {
    if (err) return console.log(err, 'Database Error!');
    console.log("database connected.");
})

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
    const email = req.body.email;
    const pw = req.body.password;
    const username = req.body.username;
    
    let hiba = { message: 'ismeretlen hiba', code: 'unknown_error' };
    
    bcrypt
        .hash(pw, 10)
        .then(hash => {

            console.log(`Hash: ${hash}`);
            let qr = `CALL felhasznalofeltoltes('${email}','${hash}','${username}')`;

            db.query(qr, (err, result) => {
                if (err) {
        
                    // email létezik
                    if (err.sqlMessage.includes('\'PRIMARY\'')) {
                        hiba.message = 'Ezzel az email címmel már van felhasználó!';
                        hiba.code = 'email_exists';
                    }
        
                    if (err.sqlMessage.includes('\'felhasznalonev\'')) {
                        hiba.message = 'Ezzel a felhasználónévvel már van felhasználó!';
                        hiba.code = 'username_exists';
                    }
        
                    res.send(hiba);
                    return console.log(err)
                };
            })
        })
        .catch(err => {
            return console.error(err.message)
        });
    
        res.send({
            message: 'Felhasználó sikeresen létrehozva!',
            code: 'user_created'
        })
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

//szerver futtatása
app.listen(3000, () => {
    console.log(`server is running on http://localhost:3000`);
})