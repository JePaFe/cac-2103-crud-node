require('dotenv').config()

const mysql = require('mysql')

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

connection.connect((err) => {
    if (err) { throw err }
})

module.exports = connection

// connection.query('select * from productos', (err, results) => {
//     if (err) { throw err }

//     console.log(results, results[0].name)
// })

//connection.end()