const jwt = require('jsonwebtoken');

// =====================
// Verificar TOKEN
// =====================

let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify( token , process.env.SEED , (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no Valido'
                }
            });
        }
        req.usuario = decoded.usuario; 
        next();
    }); 
    
};

// =====================
// Verificar ADMIN ROLE
// =====================

let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;
    usuario.role;
    console.log(usuario.role , usuario.nombre);
    if (usuario.role === 'ADMIN_ROLE') {
        next();
    }
    else{
        return res.status(401).json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }

};

module.exports = {
    verificaToken,
    verificaAdmin_Role
}