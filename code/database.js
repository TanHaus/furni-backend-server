const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "database-2.cluster-ro-cdtif1ndctea.ap-southeast-1.rds.amazonaws.com",
    user: "admin",
    password: "eZZad1ikJ3bO20YCrhkO",
    database: "furni"
})

module.exports = pool