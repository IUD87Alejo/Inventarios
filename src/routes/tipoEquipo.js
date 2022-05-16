const express = require("express");
const tipoEquipoSchema = require("../models/tipoEquipoModel");

const router = express.Router();

const path = '/tipo_equipos';

//Create
router.post(`${path}/`, (req, res) => {
    const tipoE = tipoEquipoSchema(req.body);
    tipoE
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//get all
router.get(`${path}/`, (req, res) => {
    tipoEquipoSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//get by ID
router.get(`${path}/:id`, (req, res) => {
    const { id } = req.params;
    tipoEquipoSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//update by ID
router.put(`${path}/:id`, (req, res) => {
    const { id } = req.params;
    const { nombre, estado } = req.body;
    tipoEquipoSchema
        .updateOne({ _id: id }, { $set: { nombre, estado } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//delete by ID
router.delete(`${path}/:id`, (req, res) => {
    const { id } = req.params;
    tipoEquipoSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;