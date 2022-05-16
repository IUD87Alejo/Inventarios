const express = require("express");
const marcaSchema = require("../models/marcaModel");

const router = express.Router();

const path = '/marcas';

//Create
router.post(`${path}/`, (req, res) => {
    const marca = marcaSchema(req.body);
    marca
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//get all
router.get(`${path}/`, (req, res) => {
    marcaSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
    //res.send("Creación de Usuario");
});

//get by ID
router.get(`${path}/:id`, (req, res) => {
    const { id } = req.params;
    marcaSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
    //res.send("Creación de Usuario");
});

//update by ID
router.put(`${path}/:id`, (req, res) => {
    const { id } = req.params;
    const { nombre, estado } = req.body;
    marcaSchema
        .updateOne({ _id: id }, { $set: { nombre, estado } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
    //res.send("Creación de Usuario");
});

//delete by ID
router.delete(`${path}/:id`, (req, res) => {
    const { id } = req.params;
    marcaSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
    //res.send("Creación de Usuario");
});

module.exports = router;