const bcrypt = require('bcrypt');
const saltRounds = 10;

function generateHash(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) {
        return reject(err);
      }
      return resolve(hash);
    });
  })
}

function checkPassword(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function (err, result) {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    })
  })
}

module.exports = { 
  generateHash, 
  checkPassword
}