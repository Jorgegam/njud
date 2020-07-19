// ======================
// puerto
// ======================
process.env.PORT = process.env.PORT || 3000;

// ======================
// Entorno
// ======================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ======================
// Vencimiento del Token
// ======================
// 60 seg 60 min 24 hrs 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ======================
// SEED de autenticación
// ======================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ======================
// Base de datos
// ======================
let urlDB;

if ( process.env.NODE_ENV === 'dev' ) {
    urlDB = 'mongodb://localhost/cafe'
}
else{
    urlDB = process.env.MONGO_URI;
}   

process.env.URLDB = urlDB;

// ======================
// Google client ID
// ======================
process.env.CLIENT_ID = process.env.CLIENT_ID || '134371864795-l7hb699mmh0rlr9n9jnlgaoijf624rvh.apps.googleusercontent.com';
