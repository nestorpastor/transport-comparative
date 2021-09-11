var getRoutePricesCabify = require('../cabify/routes')
var routeHandler = require('../handler/index')
// Requires
var express = require('express');


// Init var
var app = express();

// Rutas
app.get('/GetPreciosRuta/:lati/:loni/:latf/:lonf', async (req, res, next) => {
  // let a = await getRoutePricesCabify();

  // let res = [
  //   {
  //     app:'uber',
  //     fee:123

  //   },
  //   {
  //   }
  // ]

  from = [,]
  to = [,]
  let data = routeHandler(from, to);

  res.status(200).json({
    ok: true,
    mensaje: 'Peticion realizada correctamente',
    data: data
  });

});
module.exports = app;