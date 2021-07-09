const express = require('express')
const router = express.Router()
const bcryptjs = require('bcryptjs')

const connection = require('../db')

router.get('/login', (req, res) => {
    res.render('auth/login')
})

router.post('/login', (req, res) => {
    if (req.body.email && req.body.password) {
         connection.query('SELECT * FROM usuarios WHERE email = ?', [ req.body.email ], async (err, results) => {
            if (err) { throw err }

            if (results.length == 0) {
                res.send('Email y/o password incorrectos')
            } else {
                console.log(req.body.password, results[0].password)
                const valid = await bcryptjs.compare(req.body.password, results[0].password)

                req.session.user_id = results[0].id

                res.redirect('/')
            }
        })
    } else {
        res.send('Email y/o password incorrectos')
    }
})

router.get('/register', (req, res) => {
    res.render('auth/register')
})

router.post('/register', async (req, res) => {
    if (req.body.email && req.body.password) {
        const hash = await bcryptjs.hash(req.body.password, 8)

        connection.query('INSERT INTO usuarios SET ?', { email: req.body.email, password: hash }, (err) => {
            if (err) { throw err }

            res.redirect('/login')
        })
    } else {
        res.send('error')
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
})

module.exports = router