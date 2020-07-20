const express = require("express");
let {
  verificaToken,
  verificaAdmin_Role,
} = require("../middlewares/autenticacion");
const app = express();

let Categoria = require("../models/categoria");
const categoria = require("../models/categoria");

// Mostrar todas las categorías

app.get("/categoria", verificaToken, (req, res) => {
  
  let desde = req.query.desde || 0;
  let limite = req.query.limite || 5;
  desde = Number(desde);
  limite = Number(limite);

  Categoria.find()
  .sort('descripcion')
    .skip(desde)
    .limit(limite)
    .populate('usuario', 'nombre email')
    .exec((err, categorias) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        res.status(200).json({
            ok: true,
            categorias
        });
      
    });
});

app.get("/categoria/:id", verificaToken, (req, res) => {

    let id = req.params.id;

    Categoria.findById(id)
    .populate('usuario')
    .exec((err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
              ok: false,
              err,
            });
        }
        if ( !categoriaDB ) {
            return res.status(500).json({
                ok: false,
                err:{
                    message: 'El ID no es valido'
                }
              });
        }
        res.status(200).json({
            ok: true,
            categoria: categoriaDB,
        });
    });
});

app.post("/categoria", verificaToken, (req, res) => {
  let { descripcion } = req.body;
  let _id = req.usuario._id;

  const nuevaCategoria = new Categoria({
    descripcion,
    usuario: _id,
  });

  nuevaCategoria.save((err, categoriaDB) => {
    if (err) {
        return res.status(404).json({
            ok: false,
            err
        });
    }
    return res.json({
      ok: true,
      categoria: categoriaDB,
    });
  });
});

app.put("/categoria/:id", verificaToken, (req, res) => {

    let { descripcion } = req.body;
    let id = req.params.id;

    Categoria.findByIdAndUpdate(id, {descripcion}, {new: true}, (err, categoriaDB) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                err
            });
        }
        return res.json({
            ok: true,
            categoria: categoriaDB,
        });
    });

});

app.delete("/categoria/:id", [verificaToken, verificaAdmin_Role], (req, res) => {
    
    let id = req.params.id;
    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                err
            });
        }
        if ( !categoriaDB ) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'La categoria con ese ID no existe'
                }
            });
        }
        return res.json({
            ok: true, 
            message: 'Categoria Borrada'
        });
    })
});

module.exports = app;
