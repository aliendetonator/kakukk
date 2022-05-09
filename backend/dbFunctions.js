const bcrypt = require('bcrypt');

const register = (db, data) => {
    const email = data.email;
    const pw = data.password;
    const username = data.username;

    if(email == null || pw == null || username == null){
        return {
            message: 'Hiányzó adat!',
            code: 'missing_data'
        }
    }

    bcrypt
        .hash(pw, 10)
        .then(hash => {

            let qr = `CALL felhasznalofeltoltes('${email}','${hash}','${username}')`;

            db.query(qr, (err, result) => {
                if (err) {

                    // email létezik
                    if (err.sqlMessage.includes('\'PRIMARY\'')) {
                        return {
                            message: 'Ezzel az email címmel már van felhasználó!',
                            code: 'email_exists'
                        }
                    }

                    // felhasználónév létezik
                    if (err.sqlMessage.includes('\'felhasznalonev\'')) {
                        return {
                            message: 'Ezzel a felhasználónévvel már van felhasználó!',
                            code: 'username_exists'
                        }
                    }

                    return {
                        message: 'Ismeretlen hiba!',
                        code: 'unknown_error'
                    }
                }
            })
        })
        .catch(err => {
            return {
                message: 'Ismeretlen hiba!',
                code: 'unknown_error'
            };
        });

    return {
        message: 'Felhasználó sikeresen létrehozva!',
        code: 'user_created'
    };
}

module.exports = {
    register
}