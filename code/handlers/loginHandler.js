const pool = require('../database');
const usersQueries = require('../queries/usersQueries');
const loginQueries = require('../queries/loginQueries');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const checkPassword = require('../utility').checkPassword;
require('dotenv').config();

async function handleLoginRequest(req, res) {
  const { email, password } = req.body;
  const queryString = usersQueries.getUser({email});
  if (!queryString) {
    return res.status(400).json({
      success: false,
      message: "Missing input"
    })
  }
  try {
    const results = await pool.query(queryString);
    if (results.length === 0) {
      return res.json({
        success: false,
        message: "Invalid input"
      })
    } 
    const user = results[0];
    const match = await checkPassword(password, user.password);
    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid input"
      })
    }
    const payload = {userId: user.userId, role: user.role};
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn: process.env.ACCESS_TOKEN_LIFE}); // expiresIn is in ms
    const accessTokenExp = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY).exp;
    const refreshTokenJid = uuidv4();
    await pool.query(loginQueries.insertRefreshToken({refreshTokenJid, accessTokenExp}));
    const refreshToken = jwt.sign({...payload, ...{jid: refreshTokenJid}}, process.env.REFRESH_TOKEN_SECRET_KEY, {expiresIn: process.env.REFRESH_TOKEN_LIFE});
    return res.json({
      success: true,
      message: "User logged in successfully",
      data: {
        access_token: accessToken,
        refresh_token: refreshToken,
        token_type: "Bearer",
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

async function handleRefreshToken(req, res) {
  const refreshToken = req.body.refreshToken;
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
    const refreshTokenJid = decoded.jid;
    const results = await pool.query(loginQueries.getRefreshToken({refreshTokenJid})); 
    if (results.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized attempt to renew tokens"
      })
    }
    await pool.query(loginQueries.deleteRefreshToken({refreshTokenJid}));
    if (Math.floor(Date.now()/1000) < results[0].accessTokenExp) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized attempt to renew tokens"
      });
    }
    const payload = {userId: decoded.userId, role: decoded.role};
    const newAccessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn: process.env.ACCESS_TOKEN_LIFE});
    const newAccessTokenExp = jwt.verify(newAccessToken, process.env.ACCESS_TOKEN_SECRET_KEY).exp;
    const newRefreshTokenJid = uuidv4();
    await pool.query(loginQueries.insertRefreshToken({refreshTokenJid: newRefreshTokenJid, accessTokenExp: newAccessTokenExp}));
    const newRefreshToken = jwt.sign({...payload, ...{jid: newRefreshTokenJid}}, process.env.REFRESH_TOKEN_SECRET_KEY, {expiresIn: process.env.REFRESH_TOKEN_LIFE});
    return res.json({
      success: true,
      message: "Tokens are renewed successfully",
      data: {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        token_type: "Bearer",        
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "DB error"
    });
  }
}

async function handleDeleteToken(req, res) {
  const refreshToken = req.body.refreshToken;
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
    const refreshTokenJid = decoded.jid;
    await pool.query(loginQueries.deleteRefreshToken({refreshTokenJid}));
    return res.json({
      success: true,
      message: "Token deleted successfully"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "DB error"
    })
  }
}

module.exports = {
  handleLoginRequest,
  handleRefreshToken,
  handleDeleteToken
};