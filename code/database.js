const mysql = require('mysql');
<<<<<<< HEAD
const util = require('util');
=======
>>>>>>> 830792b... implement environmental variables
require('dotenv').config();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})
pool.query = util.promisify(pool.query) 
module.exports = pool