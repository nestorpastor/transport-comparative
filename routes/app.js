// Requires
var express = require('express');

// Init var
var app = express();

// Rutas
app.get('/', (req, res, next) => {

  res.status(200).json({
    ok: true,
    mensaje: 'Peticion a Lita transporte realizada correctamente'
  });

});
module.exports = app;