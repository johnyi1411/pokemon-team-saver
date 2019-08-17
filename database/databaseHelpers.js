const mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'abc12345',
    database: 'pokemonApp'
});

db.connect();

var createUser = function(username, cb) {
    db.query('INSERT INTO user (username) VALUES(?)', [username], (err, results) => {
        if (err) {
            throw err;
        }
        console.log("Create User Results:", results);
        cb(results);
    })
}

//Helper function to get User ID
var getUserIdByUsername = function(username, cb) {
    db.query('SELECT id FROM user WHERE username = ?', [username], (err, results) => {
        if (err) {
            throw err;
        }
        if (!results.length) {
            throw "No users found";
        }
        var userId = results[0].id;
        
        cb(userId);
    })
}

var createSession = function(username, hash, cb) {
    getUserIdByUsername(username, (userId) => {
        db.query('INSERT INTO session (user_id, hash) VALUES (?, ?)', [userId, hash], (err, results) => {
            if (err) {
                throw err;
            }
            console.log("Create Session Results: ", results);
            cb(results);
        });
    });
}

var getSessionByUsername = function(username, cb) {
    getUserIdByUsername(username, (userId) => {
        db.query('SELECT * FROM session WHERE id = ?', [userId], (err, results) => {
            if (err) {
                throw err;
            }
            if (!results.length) {
                throw "No session found";
            }
            console.log("Get Session Results: ", results);
            cb(results);
        });
    });
}

module.exports.createUser = createUser;
module.exports.createSession = createSession;
module.exports.getSessionByUsername = getSessionByUsername;