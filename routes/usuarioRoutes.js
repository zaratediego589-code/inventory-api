const express = require("express");

const usuarioController = require("../controllers/usuarioController");

const verificarToken = require("../middlewares/authMiddleware");

const verificarRol = require("../middlewares/roleMiddleware");

const router = express.Router();

// ======================================
// SOLO ADMINISTRADORES
// ======================================

router.use(verificarToken);

router.use(verificarRol("administrador"));

// ======================================
// RUTAS DE USUARIOS
// ======================================

router.get("/", usuarioController.obtenerUsuarios);

router.get("/:id", usuarioController.obtenerUsuarioPorId);

router.post("/", usuarioController.crearUsuario);

router.put("/:id", usuarioController.actualizarUsuario);

router.patch("/:id/estado", usuarioController.cambiarEstadoUsuario);

module.exports = router;