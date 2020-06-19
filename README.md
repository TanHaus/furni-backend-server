# furni-backend-server
# API endpoints
## Login
### 1. /login (POST)
```javascript
Header: {
  "Content-Type": "application/json"
},
Payload: {
  "email": !String,
  "password": !String
},
Response: {
  Success: {
    "success": true,
    "message": String,
    "data": {
      "access_token": String,
      "refresh_token": String,
      "token_type": "Bearer"
    }
  },
  Failure: {
    "success": false,
    "message": String
  }
}
```
### 2. /refreshToken (POST)
```javascript
Header: {
  "Content-Type": "application/json"
},
Payload: {
  "refreshToken": !String
},
Response: {
  Success: {
    "success": true,
    "message": String,
    "data": {
      "access_token": String,
      "refresh_token": String,
      "token_type": "Bearer"
    }
  },
  Failure: {
    "success": false,
    "message": String
  }
}
```
### 3. /refreshToken (DELETE)
```javascript
Header: {
  "Content-Type": "application/json"
},
Payload: {
  "refreshToken": !String
},
Response: {
  Success: {
    "success": true,
    "message": String,
  },
  Failure: {
    "success": false,
    "message": String
  }
}
```
## Users
### 1. /users (POST)
```javascript
Header: {
  "Content-Type": "application/json"
},
Payload: {
  "email": !String,
  "name": !String,
  "password": !String,
  "profilePicUrl": String
},
Response: {
  Success: {
    "success": true,
    "message": String,
  },
  Failure: {
    "success": false,
    "message": String
  }
}
```
### 2. /users/:id (GET)
```javascript
Header: {
  "Content-Type": "application/json",
  "Authorization": "Bearer ..."
},
Payload: {},
Response: {
  Success: {
    "success": true,
    "message": String,
    "data": {
      "userId": Integer,
      "email": String,
      "name": String,
      "profilePicUrl": String
    }
  },
  Failure: {
    "success": false,
    "message": String
  }
}
```
### 3. /users/:id (PUT)
```javascript
Header: {
  "Content-Type": "application/json",
  "Authorization": "Bearer ..."
},
Payload: {
  "email": String,
  "name": String,
  "profilePicUrl": String 
},
Response: {
  Success: {
    "success": true,
    "message": String,
  },
  Failure: {
    "success": false,
    "message": String
  }
}
```
### 4. /users/:id (DELETE)
```javascript
Header: {
  "Content-Type": "application/json",
  "Authorization": "Bearer ..."
},
Payload: {},
Response: {
  Success: {
    "success": true,
    "message": String,
  },
  Failure: {
    "success": false,
    "message": String
  }
}
```
### 5. /users/:id/listings (GET)
```javascript
Header: {
  "Content-Type": "application/json",
  "Authorization": "Bearer ..."
},
Payload: {},
Response: {
  Success: {
    "success": true,
    "message": String,
    "data": Array
  },
  Failure: {
    "success": false,
    "message": String
  }
}
```
## Listings
### 1. /listings (POST)
```javascript
Header: {
  "Content-Type": "application/json",
  "Authorization": "Bearer ..."
},
Payload: {
  "sellerId": !Integer,
  "title": !String,
  "timeCreated": !Datetime,
  "price": !Decimal,
  "itemCondition": !String,
  "description": String,
  "category": String,
  "deliveryOption": String,
  "picUrls": String
},
Response: {
  Success: {
    "success": true,
    "message": String,
  },
  Failure: {
    "success": false,
    "message": String
  }
}
```
### 2. /listings (GET)
```javascript
Header: {
  "Content-Type": "application/json",
  "Authorization": "Bearer ..."
},
Payload: {},
Response: {
  Success: {
    "success": true,
    "message": String,
    "data": Array
  },
  Failure: {
    "success": false,
    "message": String
  }
}
```
### 3. /listings/:id (GET)
```javascript
Header: {
  "Content-Type": "application/json",
  "Authorization": "Bearer ..."
},
Payload: {},
Response: {
  Success: {
    "success": true,
    "message": String,
    "data": {
      "listingId": Integer,
      "sellerId": Integer,
      "title": String,
      "timeCreated": Datetime,
      "price": Decimal,
      "itemCondition": String,
      "description": String,
      "category": String,
      "deliveryOption": String,
      "status": String, ('open', 'closed')
      "picUrls": String
    }
  },
  Failure: {
    "success": false,
    "message": String
  }
}
```
### 4. /listings/:id (PUT)
```javascript
Header: {
  "Content-Type": "application/json",
  "Authorization": "Bearer ..."
},
Payload: {
  "sellerId": Integer,
  "title": String,
  "timeCreated": Datetime,
  "price": Decimal,
  "itemCondition": String,
  "description": String,
  "category": String,
  "deliveryOption": String,
  "status": String, ('open', 'closed')
  "picUrls": String
},
Response: {
  Success: {
    "success": true,
    "message": String,
  },
  Failure: {
    "success": false,
    "message": String
  }
}
```
### 5. /listings/:id (DELETE)
```javascript
Header: {
  "Content-Type": "application/json",
  "Authorization": "Bearer ..."
},
Payload: {},
Response: {
  Success: {
    "success": true,
    "message": String,
  },
  Failure: {
    "success": false,
    "message": String
  }
}
```
## Listings
### 1. /offers (POST)
```javascript
Header: {
  "Content-Type": "application/json",
  "Authorization": "Bearer ..."
},
Payload: {
  "listingId": !Integer,
  "buyerId": !Integer,
  "priceBidded": !Decimal,
  "timeCreated": !Datetime
},
Response: {
  Success: {
    "success": true,
    "message": String,
  },
  Failure: {
    "success": false,
    "message": String
  }
}
```
### 3. /offers/:id (GET)
```javascript
Header: {
  "Content-Type": "application/json",
  "Authorization": "Bearer ..."
},
Payload: {},
Response: {
  Success: {
    "success": true,
    "message": String,
    "data": {
      "offerId": Integer,
      "listingId": Integer,
      "buyerId": Integer,
      "priceBidded": Decimal,
      "status": String, ('pending', 'accepted', 'rejected')
      "timeCreated": Datetime
    }
  },
  Failure: {
    "success": false,
    "message": String
  }
}
```
### 4. /offers/:id (PUT)
```javascript
Header: {
  "Content-Type": "application/json",
  "Authorization": "Bearer ..."
},
Payload: {
  "listingId": Integer,
  "buyerId": Integer,
  "priceBidded": Decimal,
  "status": String, ('pending', 'accepted', 'rejected')
  "timeCreated": Datetime
},
Response: {
  Success: {
    "success": true,
    "message": String,
  },
  Failure: {
    "success": false,
    "message": String
  }
}
```
### 5. /offers/:id (DELETE)
```javascript
Header: {
  "Content-Type": "application/json",
  "Authorization": "Bearer ..."
},
Payload: {},
Response: {
  Success: {
    "success": true,
    "message": String,
  },
  Failure: {
    "success": false,
    "message": String
  }
}
```