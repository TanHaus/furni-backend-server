function handleCorsPolicy(req, res, next)  {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if ('OPTIONS' === req.method) {
    return res.send(200);
  }
  next();
}

function authenticateJWT(req, res, next) {

}

module.exports = {
  handleCorsPolicy,
  authenticateJWT
}