const crypto = require('crypto');

module.exports.createHash = (data, salt = '') => {
  let shasum = crypto.createHash('sha256');
  shasum.update(data, salt);
  return shasum.digest('hex');
}

module.exports.compareHash = (attempted, stored, salt) => {
  return stored === this.createHash(attempted, salt);
};

module.exports.createRandom32String = () => {
  return crypto.randomBytes(32).toString('hex');
};
