const pool = require('../database');
const usersQueries = require('../queries/usersQueries');
const checkPassword = require('../utility').checkPassword;

function handleLoginRequest(req, res) {
  const { email, password } = req.body;
  
  pool.query(usersQueries.getUser({email}), async (err, rows, fields) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "DB error"
      })
    }
    if (rows.length === 0) {
      return res.json({
        success: false,
        message: "Invalid input"
      })
    } 
    const user = rows[0];
    const match = await checkPassword(password, user.password);
    if (!match) {
      return res.json({
        success: false,
        message: "Invalid input"
      })
    }
    return res.json({
      success: true,
      message: "User logged in successfully",
      data: {
        user: rows[0],
        accessToken: "test"
      }
    })
  })
}

module.exports = {
  handleLoginRequest
};