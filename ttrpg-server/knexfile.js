require('dotenv').config()

module.exports = {
  client: 'pg',
  connection: {
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_EXTERNAL_PORT,
  },
}
