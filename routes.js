const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const geraPDFController = require('./src/controllers/gerarPDF');

// routas da home
route.get('/', homeController.paginaInicial);
route.post('/print', geraPDFController.criarPDF);


module.exports = route;