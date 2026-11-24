const productoService = require('../services/productoService');

// Registrar producto
const crearProducto = async (req, res) => {
    try {
        const producto = await productoService.crearProducto(req.body);

        res.status(201).json(producto);

    } catch (error) {
        res.status(400).json({
            mensaje: 'Error al registrar producto',
            error: error.message
        });
    }
};


// Consultar productos con filtros
const obtenerProductos = async (req, res) => {
    try {
        const productos = await productoService.obtenerProductos(
            req.query
        );

        res.status(200).json(productos);

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al consultar productos'
        });
    }
};


// Consultar producto por ID
const obtenerProductoPorId = async (req, res) => {
    try {
        const producto = await productoService.obtenerProductoPorId(
            req.params.id
        );

        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.status(200).json(producto);

    } catch (error) {
        res.status(error.name === 'CastError' ? 400 : 500).json({
            mensaje: 'Error al consultar producto'
        });
    }
};

// Actualizar producto
const actualizarProducto = async (req, res) => {
    try {
        const producto = await productoService.actualizarProducto(
            req.params.id,
            req.body
        );

        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.status(200).json(producto);

    } catch (error) {
        const status = error.name === 'ValidationError' ||
                       error.name === 'CastError' ? 400 : 500;

        res.status(status).json({
            mensaje: 'Error al actualizar producto',
            error: error.message
        });
    }
};

// Eliminar producto
const eliminarProducto = async (req, res) => {
    try {
        const producto = await productoService.eliminarProducto(
            req.params.id
        );

        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Producto eliminado correctamente'
        });

    } catch (error) {
        res.status(error.name === 'CastError' ? 400 : 500).json({
            mensaje: 'Error al eliminar producto'
        });
    }
};

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProducto
};
