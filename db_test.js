// Database set up

const Pool = require("pg").Pool;
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  user: process.env.dbusername,
  password: process.env.dbpwd,
  host: "localhost",
  port: 5432 || 8000,
  database: "recipe_test",
});

module.exports = pool;
