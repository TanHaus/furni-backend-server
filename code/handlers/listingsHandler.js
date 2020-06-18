const pool = require('../database');
const listingsQueries = require('../queries/listingsQueries');

async function createListing(req, res) {
  const { sellerId, title, timeCreated, price, itemCondition, description, category, deliveryOption, picUrls } = req.body;
  const createLisitngQueryString = listingsQueries.createListing({ sellerId, title, timeCreated, price, itemCondition, description, category, deliveryOption });
  if (!createLisitngQueryString) {
    return res.status(400).json({
      success: false,
      message: "Misisng input"
    })
  }
  try {
    const results = await pool.query(createLisitngQueryString);
    const insertPicUrlsQueryString = listingsQueries.insertPics({listingId: results.insertId, picUrls});
    if (insertPicUrlsQueryString) await pool.query(insertPicUrlsQueryString);
    return res.json({
      success: true,
      message: "Listing created"
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "DB error"
    });
  }
}

async function getListings(req, res) {
  try {
    const results = await pool.query(listingsQueries.getListings());
    return res.json({
      success: true,
      message: "Listings retrieved successfully",
      data: results
    })
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "DB error"
    })
  }
}

async function getListing(req, res) {
  const listingId = req.params.id;
  try {
    const results = await pool.query(listingsQueries.getListing(listingId));
    if (results.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid listingId"
      })
    }
    return res.json({
      success: true,
      message: "Listing retrieved successfully",
      data: results[0]
    })
  } catch (err) {
    console.log(err);
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
    await pool.query(listingsQueries.deleteListing(listingId));
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