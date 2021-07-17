require('dotenv').config()

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const session = require('express-session')
const cors = require('cors')

app.use(cors())

app.use(session({
    secret: 'JKhjhdsd/jdhd',
    resave: false,
    saveUninitialized: false,
}))

app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

app.use(express.json())

app.set('view engine', 'ejs')
app.use(expressLayouts)

app.use(express.static(__dirname + '/public'))

const isLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login')
    }

    next()
}

app.get('/', isLogin, (req, res) => {
    //console.log(req.session.user_id)
    res.render('index')
})

app.use('/', require('./routes/productos'))
app.use('/', require('./routes/contacto'))
app.use('/', require('./routes/auth'))

app.use('/api', require('./routes/api/categorias'))
app.use('/api', require('./routes/jwt'))

app.use((req, res, next) => {
    res.status(404).send('Not found')
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`http://localhost:${port}`))