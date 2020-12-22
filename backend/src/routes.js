const express = require('express');

const ProductController = require('./controllers/productController');


const routes = express.Router();

routes.post('/data',ProductController.index);

module.exports = routes;