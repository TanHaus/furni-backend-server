function getOfferById(offerId) {
  return offerId ? `SELECT * FROM offers WHERE offerId = '${offerId}';` : '';
}

function getOffersByListing({ listingId, buyerId }) {
  return !listingId 
    ? ''
    : buyerId 
    ? `SELECT * FROM offers WHERE (listingId = '${listingId}' AND buyerId = '${buyerId}');` 
    : `SELECT * FROM offers WHERE listingId = '${listingId}';`;
}

function createOffer({ buyerId, listingId, priceBidded, timeCreated }) {
  return (buyerId && listingId && priceBidded && timeCreated)
    ? `INSERT INTO offers (buyerId, listingId, priceBidded, timeCreated, status) 
      VALUES ('${buyerId}', '${listingId}', '${priceBidded}', '${timeCreated}', 'pending');` // to do: change db default value for offer.status to 'pending' and remove the status value for this insert statement
    : '';
}

function editOffer({ offerId, priceBidded, status }) {
  if (!offerId || !(priceBidded && status)) return '';
  let queryString = "UPDATE offers SET";
  if (priceBidded) queryString += ` priceBidded = '${priceBidded}',`;
  if (status) queryString += ` status = '${status}',`;
  queryString = queryString.slice(0, -1) + ");";
  return queryString;
}

function deleteOffer(offerId) {
  return offerId ? `DELETE FROM offers WHERE offerId = '${offerId}';` : '';
}

module.exports = {
  getOfferById,
  getOffersByListing,
  createOffer, 
  editOffer,
  deleteOffer,
}