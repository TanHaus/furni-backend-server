const pool = require('../database');
const usersQueries = require('../queries/usersQueries');
const generateHash = require('../utility').generateHash;

async function getUser(req, res) {
  const userId = req.params.id;
  try {
    const rows = await pool.query(usersQueries.getUser({userId}));
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }
    return res.json({
      success: true,
      message: "User retrieved successfully",
      data: rows[0]
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "DB error"
    })
  }
}

async function createUser(req, res) {
  const { email, password, name, profilePicUrl } = req.body;
  const hashedPassword = password ? await generateHash(password) : "";
  const queryString = usersQueries.createUser({ email, password: hashedPassword, name, profilePicUrl });
  if (!queryString) {
    return res.json({
      success: false,
      message: "Missing input"
    });
  }
  try {
    const rows = await pool.query(usersQueries.getUser({email}));
    if (rows.length > 0) {
      return res.status(500).json({
        success: false,
        message: "Email has been used"
      });
    }
    await pool.query(queryString);
    return res.json({
      success: true,
      message: "Account created successfully"
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "DB error"
    });
  }
}

async function editUser(req, res) {
  const userId = req.params.id;
  const { email, password, name, profilePicUrl } = req.body;
  const hashedPassword = password ? await generateHash(password) : "";
  const queryString = usersQueries.editUser({ userId, email, password: hashedPassword, name, profilePicUrl });
  if (!queryString) {
    return res.json({
      success: false,
      message: "No edit"
    })
  }
  try {
    await pool.query(queryString);
    return res.json({
      success: true,
      message: "User edited successfully"
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "DB error"
    })
  }
}

async function deleteUser(req, res) {
  const userId = req.params.id;
  try {
    await pool.query(usersQueries.deleteUser({userId}));
    return res.json({
      success: true,
      message: "User deleted successfully"
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "DB error"
    })
  }
}

function getAllListingsByUser(req, res) {
  return res.json({
    success: true,
    message: "Listings retrieved successfully",
    data: [
      {
        listingId: 1,
        sellerId: 1,
        name: "Purple sofa",
        timeCreated: "2020-04-03 14:31:32",
        timeSold: "",
        price: 13.32,
        condition: "new",
        dimensions: {
          length: 100,
          width: 100,
          height: 100
        },
        description: "beautiful",
        category: "livingRoom",
        deliveryOption: "meetup",
        status: "available"
      }
    ]
  });
}

module.exports = {
  createUser,
  getUser,
  editUser,
  deleteUser,
  getAllListingsByUser
};