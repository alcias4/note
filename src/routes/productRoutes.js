const productControllers = require('../controllers/productControllers');

const express = require('express');
const routes = express.Router();

routes.get('/registra' , productControllers.registrar);
routes.post('/regis', productControllers.store);

routes.get('/editar/:id' , productControllers.editar);
routes.put('/edit/:id' , productControllers.guardar);

routes.delete('/eli/:id' , productControllers.eliminar);




module.exports= routes;