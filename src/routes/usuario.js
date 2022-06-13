const express = require("express");
const userSchema = require("../models/usuarioModel");
const { validationResult, check, body } = require('express-validator');

const router = express.Router();

const path = '/users';

//Create user
router.post(`${path}/`, [
    check('nombre', 'nombre es requerido').not().isEmpty(),
    check('estado', 'estado es requerido').isIn(['Activo', 'Inactivo']),
    check('email', 'email es requerido').not().isEmpty(),
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    req.body.fecha_creacion = new Date();
    req.body.fecha_actualizacion = new Date();
    const usuario = userSchema(req.body);
    await usuario
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
    //res.send("Creación de Usuario");
});

//get all user
router.get(`${path}/`, async(req, res) => {
    await userSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
    //res.send("Creación de Usuario");
});

//get user by ID
router.get(`${path}/:id`, async(req, res) => {
    const { id } = req.params;
    await userSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
    //res.send("Creación de Usuario");
});

//update user by ID
router.put(`${path}/:id`, async(req, res) => {
    const { id } = req.params;
    const { nombre, email, estado } = req.body;
    req.body.fecha_actualizacion = new Date();
    await userSchema
        .updateOne({ _id: id }, { $set: { nombre, email, estado } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
    //res.send("Creación de Usuario");
});

//delete user by ID
router.delete(`${path}/:id`, async(req, res) => {
    const { id } = req.params;
    await userSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
    //res.send("Creación de Usuario");
});

module.exports = router;