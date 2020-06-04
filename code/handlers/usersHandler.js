function createUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Invalid input"
    })
  } 
  return res.json({
    success: true,
    message: "Account created successfully"
  })
}

function getUsers(req, res) {
  return res.json({
    success: true,
    message: "Users retrieved successfully",
    data: [
      {
        userId: 1,
        name: "test",
        email: "test@gmail.com",
        profilePicUrl: "test"
      }
    ]
  });
}

function getUser(req, res) {
  const id = req.params.id;
  if (id !== "1") {
    return res.status(400).json({
      success: false,
      message: "Invalid userId"
    });
  }
  return res.json({
    success: true,
    message: "User retrieved successfully",
    data: {
      userId: 1,
      name: "test",
      email: "test@gmail.com",
      profilePicUrl: "test"
    }
  });
}

function editUser(req, res) {
  const id = req.params.id;
  if (id !== "1") {
    return res.status(400).json({
      success: false,
      message: "Invalid userId"
    });
  }
  return res.json({
    success: true,
    message: "User edited successfully",
  });
}

function deleteUser(req, res) {
  const id = req.params.id;
  if (id !== "1") {
    return res.status(400).json({
      success: false,
      message: "Invalid userId"
    });
  }
  return res.json({
    success: true,
    message: "User deleted successfully",
  });
}

function getAllListingsByUser(req, res) {
  return res.json({
    success: true,
    message: "Listings retrieved successfully",
    data: [
      {
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
    ]
  });
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  editUser,
  deleteUser,
  getAllListingsByUser
};