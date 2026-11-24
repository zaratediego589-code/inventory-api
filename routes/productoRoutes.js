const express = require('express');
const productoController = require('../controllers/productoController');

const router = express.Router();

// Registrar producto
router.post('/', productoController.crearProducto);

// Consultar todos los productos
router.get('/', productoController.obtenerProductos);

// Consultar producto por ID
router.get('/:id', productoController.obtenerProductoPorId);

// Actualizar producto
router.put('/:id', productoController.actualizarProducto);

// Eliminar producto
router.delete('/:id', productoController.eliminarProducto);

module.exports = router;
