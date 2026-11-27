const express = require("express");

const authController = require("../controllers/authController");

const router = express.Router();


// INICIAR SESION

router.post("/login", authController.iniciarSesion);


module.exports = router;