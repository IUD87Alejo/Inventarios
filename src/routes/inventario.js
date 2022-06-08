const express = require("express");
const invenatrioSchema = require("../models/inventarioModel");

const router = express.Router();

const path = '/inventarios';

//Create
router.post(`${path}/`, async(req, res) => {
    const inventario = invenatrioSchema(req.body);
    inventario.fecha_creacion = new Date();
    inventario.fecha_actualizacion = new Date();
    await inventario
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//get all
router.get(`${path}/`, async(req, res) => {
    await invenatrioSchema
        .find()
        .then((data) => res.send(data))
        .catch((error) => res.json({ message: error }));
});

// //Metodo GET modificado para consulta async y traer datos especificos de los objetos
// router.get(`${path}/`, async(req, res) => {
//     try {
//         const inven = await invenatrioSchema
//         .find()
//         .populate([
//             { path: 'usuario', select: 'nombre email' },
//             { path: 'marca', select: 'nombre' },
//             { path: 'tipo', select: 'nombre' },
//             { path: 'estado' }
//         ]);
//         res.send(inven);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Ocurrio un error no esperado en el servidor');
//     }

// });

//get by ID
router.get(`${path}/:id`, async(req, res) => {
    const { id } = req.params;
    await invenatrioSchema
        .findById(id)
        .then((data) => res.send(data))
        .catch((error) => res.json({ message: error }));
});

//update by ID
router.put(`${path}/:id`, async(req, res) => {
    const { id } = req.params;
    const { serial, model, descripcion, foto, precio, fechaCompra, usuario, marca, tipo, estado } = req.body;
    await invenatrioSchema
        .updateOne({ _id: id }, { $set: { serial, model, descripcion, foto, precio, fechaCompra, usuario, marca, tipo, estado } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//delete by ID
router.delete(`${path}/:id`, async(req, res) => {
    const { id } = req.params;
    await invenatrioSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;