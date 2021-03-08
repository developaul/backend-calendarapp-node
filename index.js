const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./db/config');

// Crear servidor de express
const app = express();

// Base de datos
dbConnection();

// Cors
app.use(cors());

// Directorio publico
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

// rutas
app.use('/api/auth', require('./routes/auth'));

// TODO: CRUD: Eventos


// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
