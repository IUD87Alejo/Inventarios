const express = require("express");
const estdaoEquipoSchema = require("../models/estadoEquipoModel");

const router = express.Router();

const path = '/estado_equipos';

//Create
router.post(`${path}/`, (req, res) => {
    const estadoE = estdaoEquipoSchema(req.body);
    estadoE
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//get all
router.get(`${path}/`, (req, res) => {
    estdaoEquipoSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//get by ID
router.get(`${path}/:id`, (req, res) => {
    const { id } = req.params;
    estdaoEquipoSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//update by ID
router.put(`${path}/:id`, (req, res) => {
    const { id } = req.params;
    const { nombre, estado } = req.body;
    estdaoEquipoSchema
        .updateOne({ _id: id }, { $set: { nombre, estado } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//delete by ID
router.delete(`${path}/:id`, (req, res) => {
    const { id } = req.params;
    estdaoEquipoSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;