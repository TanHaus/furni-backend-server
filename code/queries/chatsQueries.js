function createChatSession({ listingId, buyerId }) {
  if (listingId && buyerId) {
    return `INSERT INTO chatSessions (listingId, buyerId) VALUES ('${listingId}', '${buyerId}');`;
  }
  return '';
}

function getChatSession({ listingId, buyerId }) {
  if (listingId && buyerId) {
    return `SELECT c.*, GROUP_CONCAT(m.timeCreated) AS timeCreateds, GROUP_CONCAT(m.senderId) AS senderIds, GROUP_CONCAT(m.text) AS texts 
      FROM chatSessions c LEFT JOIN chatMessages m 
      ON c.sessionId = m.sessionId 
      WHERE (c.listingId = '${listingId}' AND c.buyerId = '${buyerId}') 
      GROUP BY c.listingId;`
  }
  return '';
}

function insertChatMessage({ sessionId, senderId, timeCreated, text }) {
  if (sessionId && senderId && timeCreated && text) {
    return `INSERT INTO chatMessages (sessionId, senderId, timeCreated, text) VALUES ('${sessionId}', '${senderId}', '${timeCreated}', '${text}');`
  }
  return '';
}