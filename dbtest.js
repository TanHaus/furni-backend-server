const mysql = require('mysql');

const con = mysql.createConnection({
    host: "database-2.cluster-ro-cdtif1ndctea.ap-southeast-1.rds.amazonaws.com",
    user: "admin",
    password: "eZZad1ikJ3bO20YCrhkO"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.end();
});