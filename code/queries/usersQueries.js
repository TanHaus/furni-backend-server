function getUser({userId, email}) {
  if (userId) return `SELECT * FROM users WHERE userId = '${userId}';`;
  if (email) return `SELECT * FROM users WHERE email = '${email}';`;
  return '';
}

function createUser({userId, email, password, name, profilePicUrl}) {
  if (!(userId, email && password && name)) return '';
  let queryString = `INSERT INTO users (userId, email, password, name, profilePicUrl) VALUES ('${userId}', '${email}', '${password}', '${name}',`;
  if (profilePicUrl) queryString += ` '${profilePicUrl}',`;
  else queryString += " NULL,";
  queryString = queryString.slice(0, -1) + ");";
  return queryString;
}

function editUser({userId, email, name, profilePicUrl}) {
  if (!userId || !(name || profilePicUrl)) return '';
  let queryString = "UPDATE users SET";
  if (name) queryString += ` name = '${name}',`;
  if (profilePicUrl) queryString += ` profilePicUrl = '${profilePicUrl}',`;
  queryString = queryString.slice(0, -1) + ` WHERE userId = '${userId}';`;
  return queryString;
}

function deleteUser(userId) {
  return userId && `DELETE FROM users WHERE userId = '${userId}';`;
}

function getUserListings(userId) {
  return userId && `
    SELECT l.*, p.picUrl AS picUrls
    FROM (SELECT * FROM listings WHERE sellerId = '${userId}') l
    LEFT JOIN listingPics p
    ON l.listingId = p.listingId;`;
}

function getBuyerOffers(buyerId) {
  return buyerId && `SELECT * FROM offers WHERE buyerId = '${buyerId}';`;
}

function getUserPreferences(userId) {
  return `SELECT * FROM userPreferences WHERE userId = '${userId}';`;
}

module.exports = {
  getUser,
  createUser, 
  editUser,
  deleteUser,
  getUserListings,
  getBuyerOffers,
  getUserPreferences
}