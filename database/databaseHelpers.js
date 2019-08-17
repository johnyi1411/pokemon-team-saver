const mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'abc12345',
    database: 'pokemonApp'
});

db.connect();

var createUser = function(username) {
    db.query('INSERT INTO user (username) VALUES(?)', [username], (err, results) => {
        if (err) {
            throw err;
        }
        console.log("Create User Results:", results);
    })
}

var createSession = function(username, hash) {
    db.query('SELECT id FROM user WHERE username = ?', [username], (err, results) => {
        if (!results.length) {
            throw "No users found";
        }
        var userId = results[0].id;
        
        db.query('INSERT INTO session (user_id, hash) VALUES (?, ?)', [userId, hash], (err, results) => {
            if (err) {
                throw err;
            }
            console.log("Create Session Results: ", results);
        });
    })
}

module.exports.createUser = createUser;
module.exports.createSession = createSession;