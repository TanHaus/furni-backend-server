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

function reduceListings(rows) {
  const results = rows.reduce((acc, row) => {
    const idx = acc.findIndex(x => x.listingId === row.listingId);
    if (idx === -1) {
      row.picUrls = [row.picUrls];
      acc.push(row);
    } else {
      const targetListing = acc[idx];
      targetListing.picUrls.push(row.picUrls);
    }
    return acc;
  }, []);
  return results;
}

module.exports = { 
  generateHash, 
  checkPassword,
  reduceListings
}