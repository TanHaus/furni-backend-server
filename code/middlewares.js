const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function handleCorsPolicy(req, res, next)  {
  console.log('going thru cors');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if ('OPTIONS' === req.method) {
    return res.send(200);
  }
  next();
}

function authentication(req, res, next) {
  const authorizationHeader = req.headers['authorization'] || '';
  const accessToken = authorizationHeader.startsWith('Bearer ') ? authorizationHeader.slice(7) : '';
  if (!accessToken) {
    return res.status(401).json({
      success: false,
      message: "Missing access token"
    })
  }
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({
        success: false,
        message: err.name === "TokenExpiredError" ? "Expired access token" : "Invalid access token"
      });
    }
    req.decoded = decoded;
    next();
  });  
}

module.exports = {
  handleCorsPolicy,
  authentication
}