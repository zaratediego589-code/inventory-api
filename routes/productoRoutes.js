const express = require("express");

const productoController = require("../controllers/productoController");

const verificarToken = require("../middlewares/authMiddleware");

const verificarRol = require("../middlewares/roleMiddleware");

const router = express.Router();


// ======================================
// PROTEGER TODAS LAS RUTAS
// ======================================

router.use(verificarToken);


// ======================================
// REGISTRAR PRODUCTO
// ======================================

router.post(
    "/",
    verificarRol("administrador", "empleado"),
    productoController.crearProducto
);


// ======================================
// CONSULTAS Y REPORTES
// ======================================

router.get(
    "/",
    productoController.obtenerProductos
);

router.get(
    "/categorias",
    productoController.obtenerCategorias
);

router.get(
    "/estadisticas",
    productoController.obtenerEstadisticas
);

router.get(
    "/reportes/categorias",
    productoController.obtenerProductosPorCategoria
);

router.get(
    "/reportes/stock",
    productoController.obtenerStockPorProducto
);

router.get(
    "/alertas",
    productoController.obtenerAlertasStock
);

router.get(
    "/:id",
    productoController.obtenerProductoPorId
);


// ======================================
// ACTUALIZAR PRODUCTO
// ======================================

router.put(
    "/:id",
    verificarRol("administrador", "empleado"),
    productoController.actualizarProducto
);


// ======================================
// ELIMINAR PRODUCTO
// ======================================

router.delete(
    "/:id",
    verificarRol("administrador"),
    productoController.eliminarProducto
);


module.exports = router;
