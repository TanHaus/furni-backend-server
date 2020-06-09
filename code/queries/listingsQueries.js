function getListings() {
  return 'SELECT listings.*, GROUP_CONCAT(listingPics.picUrl) AS piclUrls FROM listings LEFT JOIN listingPics ON listings.listingId = listingPics.listingId GROUP BY listings.listingId;';
}

function getListing({listingId}) {
  if (!(listingId)) {
    return '';
  }
  return `SELECT * FROM listings INNER JOIN pictures ON listings.listingId = pictures.listingId WHERE listingId = '${listingId}';`;
}

function createListing({ sellerId, name, timeCreated, price, itemCondition, description, category, deliveryOption }) {
  if (!(sellerId && name && timeCreated && price && itemCondition)) {
    return '';
  }
  let queryString = `INSERT INTO listings (sellerId, name, timeCreated, price, itemCondition, description, category, deliveryOption, status) VALUES ('${sellerId}', '${name}', '${timeCreated}', '${price}', '${itemCondition}',`;
  if (description) {
    queryString += ` '${description}',`;
  } else {
    queryString += " NULL,";
  }
  if (category) {
    queryString += ` '${category}',`;
  } else {
    queryString += " NULL,";
  }
  if (deliveryOption) {
    queryString += ` '${deliveryOption}',`;
  } else {
    queryString += " NULL,";
  }
  queryString += " 'open',";
  queryString = queryString.slice(0, -1) + ");";
  return queryString;
}

function editListing({listingId, name, price, itemCondition, description, category, deliveryOption, status}) {
  if (!listingId || !(name || price || itemCondition || description || category || deliveryOption || status)) {
    return '';
  }
  let queryString = "UPDATE listings SET";
  if (name) {
    queryString += ` name = '${name}',`;
  }
  if (price) {
    queryString += ` price = '${price}',`;
  }
  if (itemCondition) {
    queryString += ` itemCondition = '${itemCondition}',`;
  }
  if (description) {
    queryString += ` description = '${description}',`;
  }
  if (category) {
    queryString += ` category = '${category}',`;
  }
  if (deliveryOption) {
    queryString += ` deliveryOption = '${deliveryOption}',`;
  }
  if (status) {
    queryString += ` status = '${status}',`;
  }
  queryString = queryString.slice(0, -1) + ` WHERE listingId = '${listingId}';`;
  return queryString;
}

function deleteListing({listingId}) {
  return `DELETE FROM listings WHERE listingId = '${listingId}';`;
}

function insertPics({listingId, picUrls}) {
  if (!(listingId && picUrls)) {
    return '';
  }
  let queryString = 'INSERT INTO listingPics (listingId, picUrl) VALUES';
  const urlArray = picUrls.split(',');
  for (const url of urlArray) {
    queryString += ` ('${listingId}', '${url}'),`
  }
  queryString = queryString.slice(0, -1) + ";";
  return queryString;
}

module.exports = {
  getListings,
  getListing,
  createListing, 
  editListing,
  deleteListing,
  insertPics
}