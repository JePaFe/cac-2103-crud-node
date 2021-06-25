const express = require('express')
const router = express.Router()

const productos = [
    {id: 1, name: 'Producto Nro 1'},
    {id: 2, name: 'Producto Nro 2'},
    {id: 3, name: 'Producto Nro 3'},
    {id: 4, name: 'Producto Nro 4'},
]

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/productos', (req, res) => {
    res.render('productos/index', { productos })
})

router.get('/productos/:id', (req, res) => {
    const producto = productos.find(producto => producto.id == req.params.id)
    res.render('productos/show',  { producto })
})

module.exports = router