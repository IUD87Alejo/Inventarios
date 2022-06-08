const express = require("express");
const userSchema = require("../models/usuarioModel");

const router = express.Router();

const path = '/users';

//Create user
router.post(`${path}/`, async(req, res) => {
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