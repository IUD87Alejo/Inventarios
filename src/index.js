const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const userRoutes = require("./routes/usuario");
const marcaRoutes = require("./routes/marca");
const tipoEquipoRoutes = require("./routes/tipoEquipo");
const estadoEquipoRoutes = require("./routes/estadoEquipo");


const app = express();
const port = process.env.PORT || 9000;

// middleware
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', marcaRoutes);
app.use('/api', tipoEquipoRoutes);
app.use('/api', estadoEquipoRoutes);


// routes
app.get('/', (req, res) => {
    res.send('Welcome to the Jungle')
});

// mongodb connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Conexión exitosa a DB MongoDB Atlas'))
    .catch((error) => console.log(error));

app.listen(9000, () => console.log('server listening on port', port));