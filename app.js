require('dotenv').config()

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const session = require('express-session')

app.use(session({
    secret: 'FV*_54V56yG^B_<5',
    resave: false,
    saveUninitialized: false,
}))

app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

app.set('view engine', 'ejs')
app.use(expressLayouts)

app.use(express.static(__dirname + '/public'))

const isLogin = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login')
    }

    next()
}

app.get('/', isLogin, (req, res) => {
    console.log(req.session.user_id)
    res.render('index')
})

app.use('/', require('./routes/productos'))
app.use('/', require('./routes/contacto'))
app.use('/', require('./routes/auth'))

app.use((req, res, next) => {
    res.status(404).send('Not found')
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`http://localhost:${port}`))