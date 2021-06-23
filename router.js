const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hola desde express')
})

router.get('/productos', (req, res) => {
    res.send('Listado de productos')
})

module.exports = router