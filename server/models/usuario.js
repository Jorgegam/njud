const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

let rolesValidos ={
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}; 

let usuario = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es Necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});

usuario.methods.toJSON = function () {
    let user = this;
    let userObject= user.toObject();
    delete userObject.password;
    return userObject;
}

usuario.plugin( uniqueValidator, { message: '{PATH} debe de ser unico' } )

module.exports = mongoose.model('Usuario', usuario);
