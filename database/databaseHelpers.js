const mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'abc12345',
    database: 'pokemonApp'
});

db.connect();

var createUser = function(username) {
    db.query('INSERT INTO users (username) VALUES(?)', [username], (err, results) => {
        if (err) {
            throw err;
        }
        console.log("Create User Results:", results);
    })
}