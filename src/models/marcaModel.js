//const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose");

const marcaSchema = mongoose.Schema({

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

module.exports = mongoose.model('Marca', marcaSchema);