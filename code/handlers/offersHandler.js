const pool = require('../database');
const offersQueries = require('../queries/offersQueries');

async function createOffer(req, res) {
  const listingId = req.params.listingId;
  const { buyerId, priceBidded, timeCreated } = req.body;
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
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "DB error"
    });
  }
}

async function getOffersByListing(req, res) {
  const listingId = req.params.listingId;
  const buyerId = req.query.buyerId;
  const queryString = offersQueries.getOffersByListing({ listingId, buyerId });
  if (!queryString) {
    return res.status(400).json({
      success: false,
      message: "Missing input"
    });
  }
  try {
    const results = await pool.query(queryString);
    return res.json({
      success: true,
      message: "Offers retrieved successfully",
      data: results
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "DB error"
    })
  }
}

async function getOffer(req, res) {
  const offerId = req.params.offerId;
  try {
    const results = await pool.query(offersQueries.getOffer(offerId));
    if (results.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid offerId"
      })
    }
    return res.json({
      success: true,
      message: "Offer retrieved successfully",
      data: results[0]
    })
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "DB error"
    });
  }
}

async function editOffer(req, res) {
  const offerId = req.params.offerId;
  const { priceBidded, status, timeUpdated } = req.body;
  const queryString = offersQueries.editOffer({ offerId, priceBidded, status, timeUpdated });
  if (!queryString) {
    return res.status(400).json({
      success: false,
      message: "Invalid input"
    });
  }
  try {
    await pool.query(queryString);
    return res.json({
      success: true,
      message: "Offer edited successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "DB error"
    });
  }
}

async function deleteOffer(req, res) {
  const offerId = req.params.offerId;
  try {
    await pool.query(offersQueries.deleteOffer(offerId));
    return res.json({
      success: true,
      message: "Offer deleted successfully",
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
  createOffer,
  getOffer,
  getOffersByListing,
  editOffer,
  deleteOffer
};