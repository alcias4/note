const mainControllers = require('../controllers/mainControllers');

const express = require('express')
const routes = express.Router();

// ruta especifica

routes.get('/' , mainControllers.index);

module.exports = routes;

