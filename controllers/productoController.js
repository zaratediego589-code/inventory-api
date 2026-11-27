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

// Consultar categorías
const obtenerCategorias = async (req, res) => {

    try {

        const categorias =
            await productoService.obtenerCategorias();

        res.status(200).json(categorias);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al consultar categorías'
        });

    }

};

// Consultar estadísticas
const obtenerEstadisticas = async (req, res) => {

    try {

        const estadisticas =
            await productoService.obtenerEstadisticas();

        res.status(200).json(estadisticas);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al consultar estadísticas'
        });

    }

};

const obtenerProductosPorCategoria = async (req, res) => {

    try {

        const datos =
            await productoService.obtenerProductosPorCategoria();

        res.status(200).json(datos);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al obtener productos por categoría"
        });

    }

};


const obtenerStockPorProducto = async (req, res) => {

    try {

        const datos =
            await productoService.obtenerStockPorProducto();

        res.status(200).json(datos);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al obtener stock por producto"
        });

    }

};

// ======================================
// OBTENER ALERTAS DE STOCK
// ======================================

const obtenerAlertasStock = async (req, res) => {

    try {

        const alertas =
            await productoService.obtenerAlertasStock();

        res.status(200).json(alertas);

    } catch (error) {

        res.status(500).json({

            mensaje: "Error al obtener alertas de stock"

        });

    }

};

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProducto,
    obtenerCategorias,
    obtenerEstadisticas,
    obtenerProductosPorCategoria,
    obtenerStockPorProducto,
    obtenerAlertasStock
};
