const mysql = require('mysql');
const config = require('./../config/config.js');

var db = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

/*
  ./../config/config.js FORMAT:

    config = {
    host: 'localhost',
    user: 'root',
    password: 'abc12345',
    database: 'pokemonApp'
}
*/

db.connect();

var createUser = function(username, cb) {
    db.query('INSERT INTO user (username) VALUES(?)', [username], (err, results) => {
        if (err) {
            cb(err)
        } else {
          console.log("Create User Results:", results);
          cb(null, results);
        }
    })
}

//Helper function to get User ID
var getUserIdByUsername = function(username, cb) {
    db.query('SELECT id FROM user WHERE username = ?', [username], (err, results) => {
        if (err) {
            cb(err);
        } else if (!results.length) {
          cb('no results', null);
        } else {
          var userId = results[0].id;
        
          cb(null, userId);
        }
    })
}

var createSessionWithUser = function(username, hash, cb) {
    getUserIdByUsername(username, (err, userId) => {
      if (err) {
        console.log(err);
      }
      else {
        db.query('INSERT INTO session (user_id, hash) VALUES (?, ?)', [userId, hash], (err, results) => {
            if (err) {
                throw err;
            } else {
              console.log("Create Session Results: ", results);
              cb(null, results);
            }
        });
      }
    });
}

var createSession = function(hash, cb) {
  db.query('INSERT INTO session (hash) VALUES (?, ?)', [hash], (err, results) => {
      if (err) {
          throw err;
      } else {
        console.log("Create Session Results: ", results);
        cb(null, results);
      }
  });
}

var getSessionByUsername = function(username, cb) {
    getUserIdByUsername(username, (err, userId) => {
      if (err) {
        console.log(err);
      } else {
        db.query('SELECT * FROM session WHERE id = ?', [userId], (err, results) => {
            if (err) {
                cb(err);
            } else if (!results.length) {
                cb('no results', null);
            } else {
              console.log("Get Session By User Results: ", results);
              cb(null, results);
            }
        });
      }
    });
}

var getSession = function(hash, cb) {
  db.query('SELECT * FROM session WHERE hash = ?', [hash], (err, results) => {
    if(err) {
      cb(err);
    } else if (!results.length) {
      cb('no results', null);
    } else {
      console.log('Get Session By Hash Results ', results);
    }
  })
}

module.exports.createUser = createUser;
module.exports.createSession = createSession;
module.exports.getSessionByUsername = getSessionByUsername;
module.exports.getSession = getSession;
module.exports.createSessionWithUser = createSessionWithUser;
