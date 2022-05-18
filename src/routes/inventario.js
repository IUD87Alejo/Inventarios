const express = require("express");
const invenatrioSchema = require("../models/inventarioModel");

const router = express.Router();

const path = '/inventarios';

//Create
router.post(`${path}/`, (req, res) => {
    const inventario = invenatrioSchema(req.body);
    inventario
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//get all
router.get(`${path}/`, (req, res) => {
    invenatrioSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//get by ID
router.get(`${path}/:id`, (req, res) => {
    const { id } = req.params;
    invenatrioSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//update by ID
router.put(`${path}/:id`, (req, res) => {
    const { id } = req.params;
    const { serial, model, descripcion, foto, precio, fechaCompra, usuario, marca, tipo, estado } = req.body;
    invenatrioSchema
        .updateOne({ _id: id }, { $set: { serial, model, descripcion, foto, precio, fechaCompra, usuario, marca, tipo, estado } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//delete by ID
router.delete(`${path}/:id`, (req, res) => {
    const { id } = req.params;
    invenatrioSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;