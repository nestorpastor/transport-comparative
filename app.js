// Requires
var express = require('express');

// Init var
var app = express();
var server = require('http').createServer(app);


// CORS
const cors = require('cors');
app.use(cors());


// importar rutas
var appRoutes = require('./routes/app');
var precios = require('./routes/compare');

app.use('/precios', precios);
app.use('/', appRoutes);


var PORT = process.env.PORT || 8080;
//var PORT = 3000;
server.listen(PORT, () => {
  console.log('Node/Express: \x1b[32m%s\x1b[0m', 'online - port: ' + PORT);
});
