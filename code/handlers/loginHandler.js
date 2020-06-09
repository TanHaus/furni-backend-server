const pool = require('../database');
const usersQueries = require('../queries/usersQueries');
const checkPassword = require('../utility').checkPassword;

async function handleLoginRequest(req, res) {
  const { email, password } = req.body;
  
  try {
    const results = await pool.query(usersQueries.getUser({email}));
    if (results.length === 0) {
      return res.json({
        success: false,
        message: "Invalid input"
      })
    } 
    const user = results[0];
    const match = await checkPassword(password, user.password);
    if (!match) {
      return res.json({
        success: false,
        message: "Invalid input"
      })
    }
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        user: user,
        accessToken: "test"
      }
    })
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "DB error"
    })
  }
}

module.exports = {
  handleLoginRequest
};