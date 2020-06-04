function handleLoginRequest(req, res) {
  const { email, password } = req.body;
  if (email !== "test@gmail.com" || password !== "test") {
    return res.json({
      success: false,
      message: "Invalid input"
    })
  } 
  return res.json({
    success: true,
    message: "User logged in successfully",
    data: {
      user: {
        userId: 1,
        userName: "test",
        email: "test@gmail.com",
        role: "client",
        profilePic: "test"
      },
      accessToken: "test"
    }
  })
}

module.exports = {
  handleLoginRequest
};