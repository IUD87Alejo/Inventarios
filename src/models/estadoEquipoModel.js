const mongoose = require("mongoose");

const estadoEquipoSchema = mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    fecha_creacion: {
        type: Date,
        required: true
    },
    fecha_actualizacion: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model('Estado_Equipo', estadoEquipoSchema);