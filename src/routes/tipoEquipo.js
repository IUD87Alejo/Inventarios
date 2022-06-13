const express = require("express");
const tipoEquipoSchema = require("../models/tipoEquipoModel");
const { validationResult, check, body } = require('express-validator');

const router = express.Router();

const path = '/tipo_equipos';

//Create
router.post(`${path}/`,[
    check('nombre', 'nombre es requerido').not().isEmpty(),
    check('estado', 'estado es requerido').isIn(['Activo', 'Inactivo']),
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    req.body.fecha_creacion = new Date();
    req.body.fecha_actualizacion = new Date();
    const tipoE = tipoEquipoSchema(req.body);
    await tipoE
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//get all
router.get(`${path}/`, async(req, res) => {
    await tipoEquipoSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//get by ID
router.get(`${path}/:id`, async(req, res) => {
    const { id } = req.params;
    await tipoEquipoSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//update by ID
router.put(`${path}/:id`, async(req, res) => {
    const { id } = req.params;
    const { nombre, estado } = req.body;
    req.body.fecha_actualizacion = new Date();
    await tipoEquipoSchema
        .updateOne({ _id: id }, { $set: { nombre, estado } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//delete by ID
router.delete(`${path}/:id`, async(req, res) => {
    const { id } = req.params;
    await tipoEquipoSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;