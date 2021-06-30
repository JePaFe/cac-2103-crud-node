const express = require('express')
const router = express.Router()

const { body, validationResult } = require('express-validator')

router.get('/contacto', (req, res) => {
    res.render('contacto', { values: {} })
})

router.post('/contacto', [
    body('nombre', 'Nombre es requerido y tiene que tener mas de 3 caracteres')
        .notEmpty()
        .isLength(3),
    body('email')
        .notEmpty().withMessage('El email no puede estar vacio')
        .isEmail().withMessage('El email tiene que ser valido'),
    body('mensaje', 'Debe completar este campo').notEmpty(),
], (req, res) => {
    const errors = validationResult(req)
    console.log(req.body, errors)
    if (!errors.isEmpty()) {
        res.render('contacto', { values: req.body, errors: errors.array() })
    } else {
        res.redirect('/')
    }
})

module.exports = router