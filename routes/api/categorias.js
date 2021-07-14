const express = require('express')
const router = express.Router()

const connection = require('../../db')

router.get('/categorias', (req, res) => {
    connection.query('SELECT * FROM categorias', (err, results) => {
        if (err) { throw err }

        res.json(results)
    })
})

router.get('/categorias/:id', (req, res) => {
    connection.query('SELECT * FROM categorias WHERE id = ?', [ req.params.id ], (error, results) => {
        if (error) { throw error }

        if (results.length > 0) {
            res.json(results[0])
        } else {
            res.json({ message: 'No hay elementos' })
        }
    })
})

router.post('/categorias', (req, res) => {
    connection.query('INSERT INTO categorias SET ?', { name: req.body.name }, (error, results) => {
        if (error) { 
            console.log(error)
            return res.json({ error: 'No se pudo conectar a la DB' })
            //throw error
        }

        console.log(results)

        res.json({ id: results.insertId, name: req.body.name })
    })
})

router.put('/categorias/:id', (req, res) => {
    connection.query('UPDATE categorias SET ? WHERE id = ?', [ { name: req.body.name }, req.params.id ], (error) => {
        if (error) { 
            return res.sendStatus(500)
        }

        res.json({ id: req.params.id, name: req.body.name })
    })
})

router.delete('/categorias/:id', (req, res) => {
    connection.query('DELETE FROM categorias WHERE id = ?', [ req.params.id ], error => {
        if (error) { return res.sendStatus(500) }

        res.sendStatus(200)
    })
})

module.exports = router