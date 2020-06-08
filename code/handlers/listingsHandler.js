const pool = require('../database');
const listingsQueries = require('../queries/listingsQueries');

async function createListing(req, res) {
  const { sellerId, name, timeCreated, price, itemCondition, description, category, deliveryOption } = req.body;
  const queryString = listingsQueries.createListing({ sellerId, name, timeCreated, price, itemCondition, description, category, deliveryOption });
  try {
    await pool.query(queryString);
    return res.json({
      success: true,
      message: "Listing created"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "DB error"
    });
  }
}

async function getListings(req, res) {
  try {
    const rows = await pool.query(listingsQueries.getListings());
    return res.json({
      success: true,
      message: "Listings retrieved successfully",
      data: rows
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "DB error"
    })
  }
}

async function getListing(req, res) {
  const listingId = req.params.id;
  try {
    const rows = await pool.query(listingsQueries.getListing({listingId}));
    if (rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid listingId"
      })
    }
    return res.json({
      success: true,
      message: "Listing retrieved successfully",
      data: rows[0]
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "DB error"
    })
  }
}

async function editListing(req, res) {
  const listingId = req.params.id;
  const { name, price, itemCondition, description, category, deliveryOption } = req.body;
  const queryString = listingsQueries.editListing({listingId, name, price, itemCondition, description, category, deliveryOption});
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
      message: "Listing edited successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "DB error"
    })
  }
}

async function deleteListing(req, res) {
  const listingId = req.params.id;
  try {
    await pool.query(listingsQueries.deleteListing({listingId}));
    return res.json({
      success: true,
      message: "Listing deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "DB error"
    })
  }
}

module.exports = {
  createListing,
  getListings,
  getListing,
  editListing,
  deleteListing
};