const utils = require('../lib/hashUtils.js');
const model = require('../../database/databaseHelpers.js');

module.exports.createSession = (req, res, next) => {
  //if user has no cookie
  if(!req.cookies.sessionHash) {
    let rand = utils.createRandom32String();
    let hash = utils.createHash(rand);
    model.createSession(hash, (err, results) => {
      if (err) {
        console.log('ERROR FROM CREATE: ', err);
      } else {
        res.cookie('sessionHash', hash)
        req.session = {
          hash,
        };
      };
      next();
    })
  }
  //user has cookie
  else {
    model.getSession(req.cookies.sessionHash, (err, results)=>{
      //invalid cookie
      if(err) {
        console.log('ERROR FROM GET: ', err);
        let rand = utils.createRandom32String();
        let hash = utils.createHash(rand);
        model.createSession(hash, (err, results) =>{
          if (err) {
            console.log('ERROR FROM CREATE: ', err);
          } else {
            res.cookie('sessionHash', hash)
            req.session = {
              hash,
            };
          };
          next();
        })
      //valid cookie
      } else {
        req.session = {
          hash: req.cookies.sessionHash,
        }
      }
    });
  }
}
