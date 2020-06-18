function getOffer(offerId) {
  if (!(offerId)) {
    return '';
  }
  return `SELECT * FROM offers WHERE offerId = '${offerId}';`;
}

function createOffer({ buyerId, listingId, priceBidded, timeCreated }) {
  if (!(buyerId && listingId && priceBidded && timeCreated)) {
    return '';
  }
  let queryString = `INSERT INTO offers (buyerId, listingId, priceBidded, timeCreated, status) VALUES ('${buyerId}', '${listingId}', '${priceBidded}', '${timeCreated}', 'pending');`;
  return queryString;
}

function editOffer({ offerId, priceBidded, status }) {
  if (!offerId || !(priceBidded && status)) {
    return '';
  }
  let queryString = "UPDATE offers SET";
  if (priceBidded) {
    queryString += ` priceBidded = '${priceBidded}',`;
  }
  if (status) {
    queryString += ` status = '${status}',`;
  } 
  queryString = queryString.slice(0, -1) + ");";
  return queryString;
}

function deleteOffer(offerId) {
  return `DELETE FROM offers WHERE offerId = '${offerId}';`;
}

module.exports = {
  getOffer,
  createOffer, 
  editOffer,
  deleteOffer,
}