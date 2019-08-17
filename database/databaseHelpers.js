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

var createUser = (username, cb) => {
    db.query('INSERT INTO user (username) VALUES(?)', [username], (err, results) => {
        if (err) {
            cb(err)
        } else {
          console.log("Create User Results:", results);
          cb(null, results);
        }
    })
}

var createPokemonInstance = (pokemon_id, username, name, level, cb) => {
  getUserIdByUsername(username, (err, userId) => {
    if (err) {
      console.log(err);
    } else {
      console.log('userID:', userId);
      db.query('INSERT INTO pokemon_instance (pokemon_id, user_id, name, level) VALUES (?, ?, ?, ?)', [pokemon_id, userId, name, level], (err, results) => {
        cb(err, results)
      });
    }
  });
} 

//Helper function to get User ID
var getUserIdByUsername = (username, cb) => {
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

var createSessionWithUser = (username, hash, cb) => {
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
  db.query('INSERT INTO session (hash) VALUES (?)', [hash], (err, results) => {
      if (err) {
          throw err;
      } else {
        console.log("Create Session Results: ", results);
        cb(null, results);
      }
  });
}

var getSessionByUsername = (username, cb) => {
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

var getSession = (hash, cb) => {
  db.query('SELECT * FROM session WHERE hash = ?', [hash], (err, results) => {
    if(err) {
      cb(err);
    } else if (!results.length) {
      cb('no results', null);
    } else {
      console.log('Get Session By Hash Results ', results);
      cb(null, results);
    }
  })
}

module.exports.createUser = createUser;
module.exports.createSession = createSession;
module.exports.getSessionByUsername = getSessionByUsername;
module.exports.getSession = getSession;
module.exports.createSessionWithUser = createSessionWithUser;
module.exports.createPokemonInstance = createPokemonInstance;
