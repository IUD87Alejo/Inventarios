const express = require("express");
const invenatrioSchema = require("../models/inventarioModel");
const { validarInventario } = require('../helpers/validar-inventario');

const router = express.Router();

const path = '/inventarios';

//Create
router.post(`${path}/`, async(req, res) => {

    //Validacion por validar-inventario.js, saca error al buscar el body
    // const validaciones = validarInventario(req);
    // if (validaciones.length > 0) {
    //     return res.status(400).send(validarInventario());
    // }

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
        .populate([
            {
                path: 'usuario', select: 'nombre email estado'
            },
            {
                path: 'marca', select: 'nombre estado'
            },
            {
                path: 'tipo', select: 'nombre estado'
            },
            {
                path: 'estado', select: 'nombre estado'
            }
        ])
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

    if(id=='0'){
        return res.status(404).send('Inventario no existe');
    }

    await invenatrioSchema
        .findById(id)
        .then((data) => res.send(data))
        .catch((error) => res.status(500).json({ message: error }));
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