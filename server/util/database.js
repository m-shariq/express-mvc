const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "wms1",
  password: "",
});

module.exports = pool.promise();
