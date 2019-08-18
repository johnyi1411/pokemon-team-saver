const mysql = require('mysql');
const config = require('../config/config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: 'mysql',
  define: {
    freezeTableName: true,
    timestamps: false
  }
});


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

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  salt: Sequelize.STRING
});

const PokemonInstance = sequelize.define('pokemon_instance', {
  pokemon_id: Sequelize.INTEGER,
  user_id: Sequelize.INTEGER,
  name: Sequelize.STRING,
  level: Sequelize.INTEGER
});

const Session = sequelize.define('session', {
  user_id: Sequelize.INTEGER,
  hash: Sequelize.STRING
});

User.sync();
PokemonInstance.sync();
Session.sync();

/*
user = {
  username,
  password, (hash)
  salt
}
*/
var createUser = (user) => {
  return User.findOrCreate({where: user});
};

var createPokemonInstance = (pokemonId, username, name, level) => {

  return getUserIdByUsername(username)
  .then(data => {
    if (data) {
      return PokemonInstance.create({
        pokemon_id: pokemonId,
        user_id: data,
        name: name,
        level: level
      })
    }
  })
}; 

//Helper function to get User ID
var getUserIdByUsername = (username) => {
  
  return User.findOne({where: {username: username}})
  .then(data => {
    if (data && data.id) {
      return data.id;
    } else {
      console.log('no matching user found or something went wrong');
    }
  })
};

var createSessionWithUser = (username, hash) => {

  return getUserIdByUsername(username)
  .then(userId => {
    if (userId) {
      return Session.findOne({where: {user_id: userId}})
      .then(data => {
        if (data) {
          return Session.update({hash: hash}, {where: {user_id: userId}});
        } else {
          return Session.create({user_id: userId, hash: hash});
        }
      })
    }
  })
};


var createSession = function(hash) {

  return Session.create({
    hash: hash
  });
};

var getSessionByUsername = (username) => {

  return getUserIdByUsername(username)
  .then(userId => {
    if (userId) {
      return Session.findOne({where: {user_id: userId}});
    }
  })
  .then(data => {
    if (data) {
      return data.dataValues;
    }
  })
};

var getSession = (hash) => {

  return Session.findOne({where: {hash: hash}})
  .then(data => {
    if (data) {
      console.log(data.dataValues)
      return data.dataValues;
    }
  });
};

var updateSession = function(hash, username, cb) {
  return getUserIdByUsername(username)
  .then(userId => {
    if (userId) {
      return Session.update({hash: hash}, {where: {user_id: userId}});
    }
  })
};

module.exports.createUser = createUser;
module.exports.createSession = createSession;
module.exports.getSessionByUsername = getSessionByUsername;
module.exports.getSession = getSession;
module.exports.createSessionWithUser = createSessionWithUser;
module.exports.createPokemonInstance = createPokemonInstance;
module.exports.updateSession = updateSession;
module.exports.getUserIdByUsername = getUserIdByUsername;