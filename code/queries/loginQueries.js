function insertRefreshToken({refreshTokenJid, accessTokenExp}) {
  return refreshTokenJid && accessTokenExp ? `
    INSERT INTO refreshTokens (refreshTokenJid, accessTokenExp) 
    VALUES ('${refreshTokenJid}', '${accessTokenExp}');
    ` : '';
}

function getRefreshToken({refreshTokenJid}) {
  return refreshTokenJid ? `SELECT * FROM refreshTokens WHERE refreshTokenJid = '${refreshTokenJid}';` : '';
}

function deleteRefreshToken({refreshTokenJid}) {
  return refreshTokenJid ? `DELETE FROM refreshTokens WHERE refreshTokenJid = '${refreshTokenJid}';` : '';
}

module.exports = {
  insertRefreshToken,
  getRefreshToken,
  deleteRefreshToken
}