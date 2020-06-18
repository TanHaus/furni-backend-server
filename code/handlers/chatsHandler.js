const pool = require('../database');
const listingsQueries = require('../queries/chatsQueries');

async function createChatSession(req, res) {
  const { listingId, buyerId } = req.body;
  const createChatSessionQueryString = chatsQueries.crerateChatSession({ listingId, buyerId });
  if (!createLisitngQueryString) {
    return res.status(400).json({
      success: false,
      message: "Misisng input"
    })
  }
  try {
    const results = await pool.query(createLisitngQueryString);
    return res.json({
      success: true,
      message: "Chat session created",
      data: { sessionId: results.insertId }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "DB error"
    });
  }
}

async function getChatSession(req, res) {
  const sessionId = req.params.id;
  const getChatSessionQueryString = chatsQueries.getChatSession(sessionId);
  try {
    const results = await pool.query(getChatSessionQueryString);
    if (results.length === 0) {
      return res.status(400).json({
        succes: false,
        message: "Invalid sessionId"
      });
    }
    const data = results[0];
    const session = { sessionId: data.sessionId, listingId: data.listingId, buyerId: data.buyerId };
    const timesCreateds = data.timeCreateds.split(',');
    const senderIds = data.senderIds.split(',');
    const texts = data.texts.split(',');
    const messages = texts.map(text, index => {
      return {
        text,
        senderId: senderIds[index],
        timeCreated: timesCreateds[index]
      };
    });
    return res.json({
      success: true,
      message: "Chat session retrieved successfully",
      data: {
        session,
        messages
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "DB error"
    });
  }
}



module.exports = {
  createChatSession,
  getChatSession
};