function createOffer(req, res) {
  const { buyerId, listingId, value, timeCreated } = req.body;
  if (!(buyerId && listingId && value && timeCreated)) {
    return res.status(400).json({
      success: false,
      message: "Invalid or missing input"
    })
  }
  return res.json({
    success: true,
    message: "Offer created"
  });
}

function getOffer(req, res) {
  const id = req.params.id;
  if (id !== "1") {
    return res.status(400).json({
      success: false,
      message: "Invalid offerId"
    })
  }
  return res.json({
    success: true,
    message: "Offer retrieved successfully",
    data: {
      offerId: 1,
      buyerId: 1,
      listingId: 1,
      value: 20,
      timeCreated: "2020-06-04 10:22:32"
    }
  })
}

function editOffer(req, res) {
  const id = req.params.id;
  if (id !== 1) {
    return res.status(400).json({
      success: false,
      message: "Invalid offerId"
    });
  }
  return res.json({
    success: true,
    message: "Offer edited successfully",
  });
}

function deleteOffer(req, res) {
  const id = req.params.id;
  if (id !== 1) {
    return res.status(400).json({
      success: false,
      message: "Invalid offerId"
    });
  }
  return res.json({
    success: true,
    message: "Offer deleted successfully",
  });
}

module.exports = {
  createOffer,
  getOffer,
  editOffer,
  deleteOffer
};