const express = require('express');
const {verificaToken} = require('../middlewares/autenticacion')
const Producto = require('../models/producto');
const app = express();

app.get('/producto', verificaToken, (req, res) => {

    let limite = req.query.limite || 5;
    let desde = req.query.desde || 0;
    desde = Number(desde);
    limite = Number(limite);

    Producto.find({disponible: true})
    .sort('nombre')
    .skip(desde)
    .limit(limite)
    .populate('usuario','nombre email')
    .populate('categoria', 'descripcion')
    .exec((err, productosDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.status(200).json({
            ok: true,
            productos: productosDB
        })
    });

});

app.get('/producto/:id', verificaToken, (req, res) => {

    let id  = req.params.id;

    Producto.findById(id, {disponible: true})
    .sort('nombre')
    .populate('usuario','nombre email')
    .populate('categoria', 'descripcion')
    .exec((err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false, 
                err:{
                    message: 'No existe ese producto con ese ID'
                }
            })
        }
        res.status(200).json({
            ok: true,
            producto: productoDB
        });
    });

});


app.get('/producto/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Producto.find({nombre:regex})
        .populate('categoria', 'nombre')
        .exec((err, productos) => {

            if (err) {
                return res.status(400).json({
                  ok: false,
                  err,
                });
            }

            res.json({
                ok: true,
                productos
            })

        });
});


app.post('/producto', verificaToken, (req, res) => {

    usuario = req.usuario._id;
    let {nombre, precioUni, descripcion, disponible, categoria} = req.body;

    let producto = new Producto({
        nombre,
        precioUni,
        descripcion,
        disponible,
        categoria,
        usuario
    });
    
    producto.save((err, productoDB) => {
        if (err) {
            return res.status(400).json({
              ok: false,
              err,
            });
        }
        res.status(200).json({
            ok: true,
            producto: productoDB,
        });
    });
});

app.put('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body  = req.body;
    Producto.findByIdAndUpdate(id, body, {new: true}, (err, productoDB) => {

        if (err) {
            return res.status(400).json({
               ok: false,
               err 
            })
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: ' El producto con ese Id no se encontro '
                } 
             });
        }

        res.status(200).json({
            ok: true,
            producto: productoDB
        });

    });

});

app.delete('/producto/:id', verificaToken, (req, res) => {
    
    let id = req.params.id;

    Producto.findByIdAndUpdate(id, {disponible: false}, {new: true}, (err, productoDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id de ese producto no existe'
                }
            });
        }

        res.status(200).json({
            ok: true,
            producto: productoDB,
            message: 'Producto eliminado'
        });

    });

});

module.exports = app;