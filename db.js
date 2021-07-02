require('dotenv').config()

const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'node'
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