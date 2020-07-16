// ======================
// puerto
// ======================
process.env.PORT = process.env.PORT || 3000;

// ======================
// Entorno
// ======================
process.env.NODE_ENV =process.env.NODE_ENV || 'dev';

// ======================
// Base de datos
// ======================
let urlDB;

if ( process.env.NODE_ENV === 'dev' ) {
    urlDB = 'mongodb://localhost/cafe'
}
else{
    urlDB = 'mongodb+srv://alexis:ayQSxxMDXzM6qPK@cluster0.mtzop.mongodb.net/cafe'
}   

process.env.URLDB = urlDB;