const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const userRoutes = require("./routes/usuario");
const marcaRoutes = require("./routes/marca");
const tipoEquipoRoutes = require("./routes/tipoEquipo");
const estadoEquipoRoutes = require("./routes/estadoEquipo");
const inventarioRoutes = require("./routes/inventario");

const app = express();
const port = process.env.PORT || 9000;

// middleware
app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', marcaRoutes);
app.use('/api', tipoEquipoRoutes);
app.use('/api', estadoEquipoRoutes);
app.use('/api', inventarioRoutes);

// routes
app.get('/', (req, res) => {
    res.send('Welcome to the Jungle')
});

// mongodb connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Conexión exitosa a DB MongoDB Atlas'))
    .catch((error) => console.log(error));

app.listen(port, () => console.log('server listening on port', port));