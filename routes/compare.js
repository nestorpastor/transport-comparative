// Requires
var express = require('express');

// Init var
var app = express();

// Rutas
app.get('/GetPreciosRuta', (req, res, next) => {

  res.status(200).json({
    ok: true,
    mensaje: 'Peticion realizada correctamente'
  });

});
module.exports = app;