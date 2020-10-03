// Database set up

const dotenv = require("dotenv");
dotenv.config();
const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.dbusername,
  password: process.env.dbpwd,
  host: "localhost",
  port: 5432 || 8000,
  database: process.env.dbname,
});

module.exports = pool;
