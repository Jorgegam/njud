require('./config/config');

const express = require("express");
const mongoose = require('mongoose');

const app = express();

const bodyParser = require("body-parser");

// MIDLEWARES APP.USE, CADA QUE LLEGUE UNA PETICIÓN
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use( require('./routes/usuario') );

// DB

mongoose.connect(process.env.URLDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(db => console.log('DB is connected'))
.catch(err => console.error(err));

app.listen(process.env.PORT, () => {
  console.log(`Server on port ${process.env.PORT}`);
});
