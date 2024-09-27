require('dotenv').config();
const mysql2 = require('mysql2')

const dbPool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

const secretKey = process.env.JWT_SECRET

module.exports = {
    dbPool: dbPool.promise(),
    secretKey: secretKey
}