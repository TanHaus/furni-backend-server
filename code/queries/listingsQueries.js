function getListings({ q, condition, maxPrice, minPrice, sort }) {
  let queryString = `SELECT * FROM listings `;
  if (q || maxPrice || minPrice || condition) queryString += `WHERE `

  if (q) { 
    const arr = q.split(' ');
    let newQuery = ``;
    arr.forEach(element => {
      newQuery += `title REGEXP "${element}" AND `
    });
    queryString += `${newQuery}`;
  };
  
  if (condition) queryString += `itemCondition="${condition}" AND `;
  if (maxPrice) queryString += `price<=${maxPrice} AND `;
  if (minPrice) queryString += `price>=${minPrice} AND `;
  if (q || maxPrice || minPrice || condition) queryString = queryString.slice(0, -4);

  let orderString = ``;
  if (sort) {
    let [field, order] = sort.split('_');
    if (order === 'ascending') {
      order = 'ASC'
    } else if (order === 'descending') {
      order = 'DESC';
    } else {
      return '';
    }
    orderString += `ORDER BY ${field} ${order} `
  }

  return `SELECT l.*, GROUP_CONCAT(listingPics.picUrl) AS picUrls 
          FROM (` + queryString + `) l 
          LEFT JOIN listingPics
          ON l.listingId = listingPics.listingId
          GROUP BY l.listingId ` + orderString + `;`;
}

function getListing(listingId) {
  if (!(listingId)) return '';
  return `SELECT listings.*, GROUP_CONCAT(listingPics.picUrl) AS picUrls FROM (SELECT * FROM listings WHERE listings.listingId = '${listingId}') listings LEFT JOIN listingPics ON listings.listingId = listingPics.listingId GROUP BY listings.listingId;`;
}

function createListing({ sellerId, title, timeCreated, price, itemCondition, description, category, deliveryOption }) {
  if (!(sellerId && title && timeCreated && price && itemCondition)) return '';
  let queryString = `INSERT INTO listings (sellerId, title, timeCreated, price, itemCondition, description, category, deliveryOption, status) VALUES ('${sellerId}', '${title}', '${timeCreated}', '${price}', '${itemCondition}',`;
  if (description) queryString += ` '${description}',`;
  else queryString += " NULL,";
  if (category) queryString += ` '${category}',`;
  else queryString += " NULL,";
  if (deliveryOption) queryString += ` '${deliveryOption}',`;
  else queryString += " NULL,";
  queryString += " 'open',";
  queryString = queryString.slice(0, -1) + ");";
  return queryString;
}

function editListing({listingId, title, price, itemCondition, description, category, deliveryOption, status, timeUpdated}) {
  if (!listingId || !(title || price || itemCondition || description || category || deliveryOption || status || timeUpdated)) return '';
  let queryString = "UPDATE listings SET";
  if (name) queryString += ` name = '${name}',`;
  if (price) queryString += ` price = '${price}',`;
  if (itemCondition) queryString += ` itemCondition = '${itemCondition}',`;
  if (description) queryString += ` description = '${description}',`;
  if (category) queryString += ` category = '${category}',`;
  if (deliveryOption) queryString += ` deliveryOption = '${deliveryOption}',`;
  if (status) queryString += ` status = '${status}',`;
  if (timeUpdated) queryString += ` timeUpdated = '${timeUpdated}',`;
  queryString = queryString.slice(0, -1) + ` WHERE listingId = '${listingId}';`;
  return queryString;
}

function deleteListing(listingId) {
  return `DELETE FROM listings WHERE listingId = '${listingId}';`;
}

function insertPics({listingId, picUrls}) {
  if (!(listingId && picUrls && picUrls.length)) return '';
  let queryString = 'INSERT INTO listingPics (listingId, picUrl) VALUES';
  for (const url of picUrls) queryString += ` ('${listingId}', '${url}'),`
  queryString = queryString.slice(0, -1) + ";";
  return queryString;
}

function deletePics(listingId) {
  return listingId && `DELETE FROM listingPics WHERE listingId = '${listingId}';`
}

module.exports = {
  getListings,
  getListing,
  createListing, 
  editListing,
  deleteListing,
  insertPics,
  deletePics
}