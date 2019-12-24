const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  db_port: process.env.DB_PORT,
  port: process.env.PORT
};