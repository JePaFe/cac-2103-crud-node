const express = require('express')
const router = express.Router()
const bcryptjs = require('bcryptjs')

const jwt = require('jsonwebtoken')

const connection = require('../db')

router.post('/login', (req, res) => {
    if (req.body.email && req.body.password) {
        connection.query('SELECT * FROM usuarios WHERE email = ?', [ req.body.email ], async (err, results) => {
            if (err) { return res.sendStatus(500) }

            if (results.length == 0) {
                res.json({ error: 'Email y/o password incorrectos' })
            } else {
                const valid = await bcryptjs.compare(req.body.password, results[0].password)

                if (valid) {
                    const payload = { user_id: results[0].id }
                    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' })
                    res.json({ token })
                } else {
                    res.json({ error: 'Email y/o password incorrectos' })
                }
            }
        })
    } else {
        res.json({ error: 'Email y/o password incorrectos' })
    }
})

const isJWTLogin = (req, res, next) => {
    let token = req.headers['authorization']
    if (token) {
        token = token.replace('Bearer ', '')
        console.log(token)
        jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
            if(error) {
                res.sendStatus(401)
            } else {
                console.log(decoded)
                next()
            }
        })
    } else {
        res.sendStatus(401)
    }
}

router.get('/perfil', isJWTLogin, (req, res) => {
    res.send('Perfil')
})

module.exports = router