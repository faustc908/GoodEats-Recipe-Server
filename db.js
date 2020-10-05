// Database set up

const dotenv = require("dotenv");
dotenv.config();
const Pool = require("pg").Pool;

const devConfig = {
  user: process.env.dbusername,
  password: process.env.dbpwd,
  host: process.env.dbhost,
  port: process.env.dbport,
  database: process.env.dbname,
};

const proConfig = {
  connectionString: process.env.DATABASE_URL,
};

const pool = new Pool(
  process.env.NODE_ENV === "production" ? proConfig : devConfig
);

module.exports = pool;
