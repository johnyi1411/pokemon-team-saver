const mysql = require('mysql');
const config = require('../config/config.js');
const Sequelize = require('sequelize');
const utils = require('../server/lib/hashUtils.js');

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
  password,
}
*/
module.exports.createUser = ({username, password}) => {
  let salt = utils.createRandom32String();
  newUser = {
    username,
    password: utils.createHash(password, salt),
    salt,
  };
  return User.findOrCreate({where: {username: newUser.username}, defaults: newUser});
};

module.exports.verifyUser = ({username, password}) => {
  return User.findOne({where: {username}}).then(user => {
    if(user) {
      let attempted = password;
      let stored = user.password;
      let salt = user.salt;
      return utils.compareHash(attempted, stored, salt);
    } else {
      return false;
    }
  });
};

module.exports.createPokemonInstance = (pokemonId, username, name, level) => {

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
module.exports.getUserIdByUsername = (username) => {
  
  return User.findOne({where: {username: username}})
  .then(data => {
    if (data && data.id) {
      return data.id;
    } else {
      console.log('no matching user found or something went wrong');
    }
  })
};

module.exports.createSessionWithUser = (username, hash) => {

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


module.exports.createSession = function(hash) {

  return Session.create({
    hash: hash
  });
};

module.exports.getSessionByUsername = (username) => {

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

module.exports.getSession = (hash) => {

  return Session.findOne({where: {hash: hash}})
  .then(data => {
    if (data) {
      console.log(data.dataValues)
      return data.dataValues;
    }
  });
};

module.exports.updateSession = function(hash, username, cb) {
  return getUserIdByUsername(username)
  .then(userId => {
    if (userId) {
      return Session.update({user_id: userId}, {where: {hash}});
    }
  })
};

module.exports.deleteSession = (hash) => {
  return Session.destroy( {where: {hash}});
}
