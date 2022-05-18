const mongoose = require("mongoose");

const InventarioSchema = mongoose.Schema({

    serial: {
        type: String,
        required: true,
        unique: true
    },
    model: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    fehcaCompra: {
        type: Date,
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: false
    },
    marca: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Marca',
        required: false
    },
    tipo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tipo_Equipo',
        required: false
    },
    estado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estado_Equipo',
        required: false
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

module.exports = mongoose.model('Inventario', InventarioSchema);