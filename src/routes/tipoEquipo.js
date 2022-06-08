const express = require("express");
const tipoEquipoSchema = require("../models/tipoEquipoModel");

const router = express.Router();

const path = '/tipo_equipos';

//Create
router.post(`${path}/`, async(req, res) => {
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