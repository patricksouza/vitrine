'use strict';

const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const PORT = 3333;
const HOST = "0.0.0.0";

const app = express();

app.use(cors());

//Informar o tipo da requisição enviada
app.use(express.json());
app.use(routes);


app.listen(PORT,HOST);

console.log(`Running on http://${HOST}:${PORT}`);
