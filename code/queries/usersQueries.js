function getUser({userId, email}) {
  if (userId) {
    return `SELECT * FROM users WHERE userId = '${userId}';`;
  }
  if (email) {
    return `SELECT * FROM users WHERE email = '${email}';`;
  }
  return '';
}

function createUser({email, password, name, profilePicUrl}) {
  if (!(email && password && name)) {
    return '';
  }
  let queryString = `INSERT INTO users (email, password, name, profilePicUrl) VALUES ('${email}', '${password}', '${name}',`;
  if (profilePicUrl) {
    queryString += ` '${profilePicUrl}',`;
  } else {
    queryString += " NULL,";
  }
  queryString = queryString.slice(0, -1) + ");";
  return queryString;
}

function editUser({userId, email, password, name, profilePicUrl}) {
  if (!userId || !(email || password || name || profilePicUrl)) {
    return '';
  }
  let queryString = "UPDATE users SET";
  if (email) {
    queryString += ` email = '${email}',`;
  }
  if (password) {
    queryString += ` password = '${password}',`;
  }
  if (name) {
    queryString += ` name = '${name}',`;
  }
  if (profilePicUrl) {
    queryString += ` profilePicUrl = '${profilePicUrl}',`;
  }
  queryString = queryString.slice(0, -1) + ` WHERE userId = '${userId}';`;
  return queryString;
}

function deleteUser({userId}) {
  return userId ? `DELETE FROM users WHERE userId = '${userId}';` : '';
}

function getUserListings({userId}) {
  return userId ? `SELECT * FROM listings WHERE sellerId = '${userId}';` : '';
}
function getUserPreferences({userId}) {
  return `SELECT * FROM userPreferences WHERE userId = '${userId}';`;
}

module.exports = {
  getUser,
  createUser, 
  editUser,
  deleteUser,
  getUserListings,
  getUserPreferences
}