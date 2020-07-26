const pool = require('../database');
const tagsQueries = require('../queries/tagsQueries');
require('dotenv').config();

async function createTags(req, res){
  const labels = req.body.labels;
  const queryString = tagsQueries.createTags(labels);
  if (!queryString)
    return res.status(400).json({
      success: false,
      message: "Missing input"
    });
  try {
    await pool.query(queryString);
    return res.json({
      success: true,
      message: "Tags created successfully"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "DB error"
    });
  }
}

async function getTags(req, res) {
  try {
    const results = await pool.query(tagsQueries.getTags());
    return res.json({
      success: true,
      message: "Tags retrieved successfully",
      data: results
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: "DB error"
    });
  }
}

module.exports = {
  createTags,
  getTags
}