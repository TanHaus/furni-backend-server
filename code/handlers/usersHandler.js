const pool = require('../database');
const usersQueries = require('../queries/usersQueries');
const { v4: uuidv4 } = require('uuid');
const { generateHash, reduceListings } = require('../utility');

async function getUser(req, res) {
  const userId = req.params.userId;
  try {
    const results = await pool.query(usersQueries.getUser({userId}));
    if (results.length === 0) 
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    const user = results[0];
    delete user.password;
    return res.json({
      success: true,
      message: "User retrieved successfully",
      data: user
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "DB error"
    });
  }
}

async function createUser(req, res) {
  const { email, password, name, profilePicUrl } = req.body;
  const userId = uuidv4();
  const hashedPassword = password && await generateHash(password);
  const queryString = usersQueries.createUser({ userId, email, password: hashedPassword, name, profilePicUrl });
  if (!queryString) 
    return res.json({
      success: false,
      message: "Missing input"
    });
  try {
    const results = await pool.query(usersQueries.getUser({email}));
    if (results.length > 0) 
      return res.status(500).json({
        success: false,
        message: "Email has been used"
      });
    await pool.query(queryString);
    return res.json({
      success: true,
      message: "Account created successfully"
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "DB error"
    });
  }
}

async function editUser(req, res) {
  const userId = req.params.userId;
  const { name, profilePicUrl } = req.body;
  const queryString = usersQueries.editUser({ userId, name, profilePicUrl });
  if (!queryString) 
    return res.json({
      success: false,
      message: "Missing input"
    });
  try {
    await pool.query(queryString);
    return res.json({
      success: true,
      message: "User edited successfully"
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "DB error"
    });
  }
}

async function deleteUser(req, res) {
  const userId = req.params.userId;
  try {
    await pool.query(usersQueries.deleteUser(userId));
    return res.json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "DB error"
    });
  }
}

async function getUserListings(req, res) {
  const userId = req.params.userId;
  try {
    const results = await pool.query(usersQueries.getUserListings(userId));
    return res.json({
      success: true,
      message: "Listings retrieved successfully",
      data: reduceListings(results)
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "DB error"
    });
  }
}

async function getBuyerOffers(req, res) {
  const buyerId = req.params.userId;
  try {
    const results = await pool.query(usersQueries.getBuyerOffers(buyerId));
    return res.json({
      success: true,
      message: "Offers retrieved successfully",
      data: results
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "DB error"
    })
  }
}

async function getUserPreferences(req, res) {
  const userId = req.params.userId;
  try {
    const results = await pool.query(usersQueries.getUserPreferences(userId));
    return res.json({
      success: true,
      message: "Preferences retrieved successfully",
      data: results
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "DB error"
    });
  }
}

async function editUserPreferences(req, res) {

}

module.exports = {
  createUser,
  getUser,
  editUser,
  deleteUser,
  getUserListings,
  getBuyerOffers,
  getUserPreferences,
  editUserPreferences
}