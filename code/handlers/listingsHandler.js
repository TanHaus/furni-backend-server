const pool = require('../database');
const listingsQueries = require('../queries/listingsQueries');
const AWS = require('aws-sdk');

const s3Config = {
  region: process.env.S3_REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
};

async function createListing(req, res) {
  const { sellerId, title, timeCreated, price, itemCondition, description, category, deliveryOption } = req.body;
  const createLisitngQueryString = listingsQueries.createListing({ sellerId, title, timeCreated, price, itemCondition, description, category, deliveryOption });
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
      message: "Listing created",
      data: {
        listingId: results.insertId
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

async function addListingPic(req, res) {
  const listingId = req.params.listingId;
  const blob = req.body;
  const file = new File([blob], `${listingId}_${Date.now()}.jpeg`);
  const s3 = new AWS.S3(s3Config);
  const params = {
    Bucket: "furni-s3-bucket",
    Key: `listingPics/${file.name}`,
    Body: file,
    ACL: "public-read",
    ContentType: "image/jpeg",
    ContentDisposition: "attachment",
  };
  try {
    const data = await s3.upload(params).promise();
    await pool.query(listingsQueries.insertPic({ listingId, picUrls: [data.Location] }));
    return res.json({
      success: true,
      message: "Picutres uploaded successfully"
    })
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "DB error"
    })
  }
}

async function getListings(req, res) {
  const q = req.query.q;
  try {
    const results = await pool.query(listingsQueries.getListings(q));
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
  const listingId = req.params.listingId;
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
  const listingId = req.params.listingId;
  const { title, price, itemCondition, description, category, deliveryOption, picUrls, timeUpdated } = req.body;
  try {
    if (picUrls) {
      await pool.query(listingsQueries.deletePics(listingId));
      await pool.query(listingsQueries.insertPics({listingId, picUrls}));
    }
    const queryString = listingsQueries.editListing({listingId, title, price, itemCondition, description, category, deliveryOption, timeUpdated, status});
    if (queryString) await pool.query(queryString);
    if (picUrls || queryString) 
      return res.json({
        success: true,
        message: "Listing edited successfully",
      });
    return res.status(400).json({
      success: false,
      message: "Missing input"
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "DB error"
    })
  }
}

async function deleteListing(req, res) {
  const listingId = req.params.listingId;
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
  addListingPic,
  getListings,
  getListing,
  editListing,
  deleteListing
};