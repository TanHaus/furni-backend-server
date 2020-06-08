const pool = require('../database');
const offersQueries = require('../queries/offersQueries');

async function createOffer(req, res) {
  const { buyerId, listingId, priceBidded, timeCreated } = req.body;
  const queryString = offersQueries.createOffer({ buyerId, listingId, priceBidded, timeCreated });
  if (!queryString) {
    return res.status(400).json({
      success: false,
      message: "Missing input"
    })
  }
  try {
    await pool.query(queryString);
    return res.json({
      success: true,
      message: "Offer created"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "DB error"
    });
  }
}

async function getOffer(req, res) {
  const offerId = req.params.id;
  try {
    const rows = await pool.query(offersQueries.getOffer({offerId}));
    if (rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid offerId"
      })
    }
    return res.json({
      success: true,
      message: "Offer retrieved successfully",
      data: rows[0]
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "DB error"
    });
  }
}

async function editOffer(req, res) {
  const offerId = req.params.id;
  const { priceBidded } = req.body;
  const queryString = offersQueries.editOffer({ offerId, priceBidded });
  if (!queryString) {
    return res.status(400).json({
      success: false,
      message: "Invalid offerId"
    });
  }
  try {
    await pool.query(queryString);
    return res.json({
      success: true,
      message: "Offer edited successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "DB error"
    });
  }
}

async function deleteOffer(req, res) {
  const offerId = req.params.id;
  try {
    await pool.query(offersQueries.deleteOffer({offerId}));
    return res.json({
      success: true,
      message: "Offer deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "DB error"
    });
  }
}

module.exports = {
  createOffer,
  getOffer,
  editOffer,
  deleteOffer
};