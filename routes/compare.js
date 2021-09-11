
var routeHandler = require('../handler/index')
// Requires
var express = require('express');


// Init var
var app = express();

// Rutas
app.get('/GetPreciosRuta/:lati/:loni/:latf/:lonf', async (req, res, next) => {

  var latInicial = req.params.lati;
  var lonInicial = req.params.loni;
  var latFinal = req.params.latf;
  var lonFinal = req.params.lonf;

  from = [Number(latInicial), Number(lonInicial)];
  to = [Number(latFinal), Number(lonFinal)];

  let data = await routeHandler(from, to);

  res.status(200).json({
    ok: true,
    mensaje: 'Peticion realizada correctamente',
    data: data
  });

});
module.exports = app;