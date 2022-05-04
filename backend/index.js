const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const mysql = require("mysql2");


const app = express();

app.use(cors());
app.use(bodyparser.json());

//adatbázis csatolása

const db = mysql.createConnection(
{
    host:'localhost',
    user:'root',
    password:'',
    database:'webii',
    port:'3306'
})

// adatbázis kapcsolat ellenőrzése

db.connect(err=>
{
    if (err) console.log(err, 'Database Error!');
    console.log("database connected.");
})

//minden adat kiszedése egy táblából
app.get('/user',(req, res) =>
{
    let qr = `SELECT * FROM user`;

    db.query(qr,(err,result)=>
    {
        if(err)
        {
            console.log(err,'error!');
        }

        if(result.length>0)
        {
            res.send(
            {
                message: 'all user data',
                data: result
            })
        }
        else
        {
            res.send(
            {
                message:'data not found'
            })
        }
    })
})

//egy adat kiszedése
app.get('/user/:id',(req,res)=>
{
    let getID = req.params.id;
    let qr = `select * from user where id= ${getID}`
    db.query(qr,(err,result)=>
    {
        if(err) console.log(err);

        if(result.length>0)
        {
            res.send(
                {
                    message: 'get one data',
                    data: result
                }
            )
        }
    })
})

//adatok beszúrása
app.post('/user',(req,res)=>
{
    console.log(req.body, 'createData');

    let fullName = req.body.fullname;
    let eMail = req.body.email;
    let ph = req.body.phone;

    let qr = `INSERT INTO user (fullname, email, phone) VALUES('${fullName}', '${eMail}', '${ph}')`;

    db.query(qr,(err,result)=>
    {
        if(err) console.log(err);

        res.send(
        {
            message:'data inserted'
        })
    })
})

//adatok módosítása
app.put('/user/:id', (req,res)=>
{
    console.log(req.body, 'updateData');

    let getID = req.params.id;

    let fullName = req.body.fullname;
    let eMail = req.body.email;
    let ph = req.body.phone;

    let qr = `UPDATE user SET fullname = '${fullName}', email = '${eMail}', phone = '${ph}' WHERE id = '${getID}'`;

    db.query(qr,(err,result)=>
    {
        if (err) console.log(err);
        
        res.send(
        {
            message:'data updated'
        })
    })

})

//adat törlése
app.delete('/user/:id', (req,res)=>
{
    let getID = req.params.id;

    let qr = `DELETE FROM user WHERE id = ${getID}`;

    db.query(qr,(err,result)=>
    {
        if(err) console.log(err);

        res.send(
        {
            message:'data Deleted'
        })
    })
})

//szerver futtatása
app.listen(3000,()=>
{
    console.log("server running.");
    
})