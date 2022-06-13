const validarInventario = (req) => {
    const validaciones = [];

    if (!req.body.serial) {
        validaciones.push('Serial es requerido');
    }

    if (!req.body.modelo) {
        validaciones.push('Modelo es requerido');
    }

    if (!req.body.descripcion) {
        validaciones.push('Descripción es requerido');
    }

    if (!req.body.foto) {
        validaciones.push('Foto es requerido');
    }

    if (!req.body.fechaCompra) {
        validaciones.push('Fecha de compra es requerido');
    }

    return validaciones;
}

module.exports = {
    validarInventario
}