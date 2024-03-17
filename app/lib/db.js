const { Pool } = require('pg')
const dotenv = require('dotenv')
require('dotenv').config()

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
})

const query = async(text, params, callback) => {
  return await pool.query(text, params)
}

module.exports = { query }