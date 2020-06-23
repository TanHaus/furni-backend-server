const pool = require('../database');
const listingsQueries = require('../queries/listingsQueries');

const s3Config = {
  region: process.env.S3_REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
};

async function createListing(req, res) {
  const { sellerId, title, timeCreated, price, itemCondition, description, category, deliveryOption, pics } = req.body;
  const createLisitngQueryString = listingsQueries.createListing({ sellerId, title, timeCreated, price, itemCondition, description, category, deliveryOption });
  if (!createLisitngQueryString) {
    return res.status(400).json({
      success: false,
      message: "Misisng input"
    })
  }
  const s3 = new AWS.S3(s3Config);
  const picUrls = [];
  try {
    await Promise.all(
      pics.map(async (pic) => {
        const buf = Buffer.from(
          pic.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );
        const params = {
          Bucket: "furni-s3-bucket",
          Key: `listingPics/${Date.now()}`,
          Body: buf,
          ACL: "public-read",
          ContentEncoding: "base64",
          ContentType: "image/jpeg",
          ContentDisposition: "attachment",
        };
        const data = await s3.upload(params).promise();
        picUrls.push(data.Location);
      })
    );
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
  const { title, price, itemCondition, description, category, deliveryOption, picUrls, pics, timeUpdated } = req.body;
  const s3 = new AWS.S3(s3Config);
  try {
    if (pics) {
      await Promise.all(
        pics.map(async (pic) => {
          const buf = Buffer.from(
            pic.replace(/^data:image\/\w+;base64,/, ""),
            "base64"
          );
          const params = {
            Bucket: "furni-s3-bucket",
            Key: `listingPics/${listingId}_${Date.now()}`,
            Body: buf,
            ACL: "public-read",
            ContentEncoding: "base64",
            ContentType: "image/jpeg",
            ContentDisposition: "attachment",
          };
          const data = await s3.upload(params).promise();
          picUrls.push(data.Location);
        })
      );
    }
    if (picUrls) {
      await pool.query(listingsQueries.deletePics(listingId));
      await pool.query(listingsQueries.insertPics({listingId, picUrls}));
    }
    const queryString = listingsQueries.editListing({listingId, title, price, itemCondition, description, category, deliveryOption, timeUpdated, status});
    if (queryString) await pool.query(queryString);
    if (picUrls || queryString) return res.json({
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
  getListings,
  getListing,
  editListing,
  deleteListing
};