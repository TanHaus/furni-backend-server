const pool = require('../database');
const reduceListings = require('../utility').reduceListings;
const listingsQueries = require('../queries/listingsQueries');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const s3Config = {
  region: process.env.S3_REGION,
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
};
const s3 = new AWS.S3(s3Config);

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
  const { q, condition, minPrice, maxPrice, sort } = req.query;
  try {
    const results = await pool.query(listingsQueries.getListings({q, condition, minPrice, maxPrice, sort}));
    return res.json({
      success: true,
      message: "Listings retrieved successfully",
      data: reduceListings(results)
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
      data: reduceListings(results)[0]
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

async function createS3SignedUrl(req, res) {
  const filename = `${uuidv4()}.jpeg`;
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: filename,
    ACL: "public-read",
    ContentEncoding: "base64",
    ContentType: "image/jpeg",
    ContentDisposition: "attachment",
    Expires: 60 // seconds
  };
  try {
    const signedUrl = await s3.getSignedUrlPromise('putObject', params);
    return res.json({
      success: true,
      message: "Presigned URL for S3 upload generated successfully",
      data: {
        signedUrl,
        fileLocation: `https://furni-s3-bucket.s3-ap-southeast-1.amazonaws.com/${filename}`
      }
    })
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server error"
    })
  }
}

module.exports = {
  createListing,
  getListings,
  getListing,
  editListing,
  deleteListing,
  createS3SignedUrl
};