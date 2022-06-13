const express = require("express");
const marcaSchema = require("../models/marcaModel");
const { validationResult, check, body } = require('express-validator');

const router = express.Router();

const path = '/marcas';

//Create
router.post(`${path}/`, [
    check('nombre', 'nombre es requerido').not().isEmpty(),
    check('estado', 'estado es requerido').isIn(['Activo', 'Inactivo']),
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    req.body.fecha_creacion = new Date();
    req.body.fecha_actualizacion = new Date();
    const marca = marcaSchema(req.body);
    await marca
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//get all
router.get(`${path}/`, async(req, res) => {
    await marcaSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
    //res.send("Creación de Usuario");
});

//get by ID
router.get(`${path}/:id`, async(req, res) => {
    const { id } = req.params;
    await marcaSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
    //res.send("Creación de Usuario");
});

//update by ID
router.put(`${path}/:id`, async(req, res) => {
    const { id } = req.params;
    const { nombre, estado } = req.body;
    req.body.fecha_actualizacion = new Date();
    await marcaSchema
        .updateOne({ _id: id }, { $set: { nombre, estado } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
    //res.send("Creación de Usuario");
});

//delete by ID
router.delete(`${path}/:id`, async(req, res) => {
    const { id } = req.params;
    await marcaSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
    //res.send("Creación de Usuario");
});

module.exports = router;