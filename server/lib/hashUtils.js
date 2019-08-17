const crypto = require('crypto');

module.exports.createHash = (data, salt = '') => {
  let shasum = crypto.createHash('sha256');
  shasum.update(data, salt);
  return shasum.digest('hex');
}

