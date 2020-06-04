function createListing(req, res) {
  const { sellerId, name, timeCreated, timeSold, price, condition, dimensions, description, category, deliveryOption, status } = req.body;
  if (!(sellerId && name && timeCreated && price && condition && dimensions && deliveryOption)) {
    return res.status(400).json({
      success: false,
      message: "Invalid or missing input"
    })
  }
  return res.json({
    success: true,
    message: "Listing created"
  });
}

function getListing(req, res) {
  const id = req.params.id;
  if (id !== "1") {
    return res.status(400).json({
      success: false,
      message: "Invalid listingId"
    })
  }
  return res.json({
    success: true,
    message: "Listing retrieved successfully",
    data: {
      listingId: 1,
      sellerId: 1,
      name: "Purple sofa",
      timeCreated: "2020-04-03 14:31:32",
      timeSold: "",
      price: 13.32,
      condition: "new",
      dimensions: {
        length: 100,
        width: 100,
        height: 100
      },
      description: "beautiful",
      category: "livingRoom",
      deliveryOption: "meetup",
      status: "available"
    }
  })
}

function editListing(req, res) {
  const id = req.params.id;
  if (id !== 1) {
    return res.status(400).json({
      success: false,
      message: "Invalid listingId"
    });
  }
  return res.json({
    success: true,
    message: "Listing edited successfully",
  });
}

function deleteListing(req, res) {
  const id = req.params.id;
  if (id !== 1) {
    return res.status(400).json({
      success: false,
      message: "Invalid listingId"
    });
  }
  return res.json({
    success: true,
    message: "Listing deleted successfully",
  });
}

module.exports = {
  createListing,
  getListing,
  editListing,
  deleteListing
};