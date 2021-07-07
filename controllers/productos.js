const connection = require('../db')

module.exports.index = (req, res) => {
    connection.query('select * from productos', (err, results) => {
        if (err) { throw err }

        res.render('productos/index', { productos: results })
    })
}

module.exports.show = (req, res) => {
    console.log(req.params.id)
    connection.query('SELECT * FROM productos WHERE id = ?', [ req.params.id ], (error, results) => {
        if (error) { throw error }

        if (results.length > 0) {
            res.render('productos/show',  { producto: results[0] })
        } else {
            res.send('No hay registros')
        }
    })
}

module.exports.create = (req, res) => {
    res.render('productos/create')
}

module.exports.store = (req, res) => {
    connection.query('INSERT INTO productos SET ?', { name: req.body.name }, (error) => {
        if (error) { throw error }

        res.redirect('/productos')
    })
}

module.exports.edit = (req, res) => {
    connection.query('SELECT * FROM productos WHERE id = ?', [ req.params.id ], (error, results) => {
        if (error) { throw error }

        if (results.length > 0) {
            res.render('productos/edit',  { producto: results[0] })
        } else {
            res.send('No hay registros')
        }
    })
}

module.exports.update = (req, res) => {
    connection.query('UPDATE productos SET ? WHERE id = ?', [ { name: req.body.name, description: 'Texto...' }, req.body.id ], (error) => {
        if (error) { throw error }

        res.redirect('/productos')
    })
}

module.exports.delete = (req, res) => {
    connection.query('DELETE FROM productos WHERE id = ?', [ req.params.id ], error => {
        if (error) { throw error }

        res.redirect('/productos')
    })
}