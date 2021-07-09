const express = require('express')
const router = express.Router()

const controller = require('../controllers/productos')
const { route } = require('./contacto')

const isLogin = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login')
    }

    next()
}

router.get('/productos', isLogin, controller.index)

router.get('/productos/create', controller.create)
router.post('/productos/store', controller.store)

router.get('/productos/:id', controller.show)

router.get('/productos/:id/edit', controller.edit)
router.put('/productos/update', controller.update)

router.delete('/productos/:id/delete', controller.delete)

module.exports = router