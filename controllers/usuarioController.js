const usuarioService = require("../services/usuarioService");

const mongoose = require("mongoose");

// ======================================
// OBTENER USUARIOS
// ======================================

const obtenerUsuarios = async (req, res) => {

    try {

        const usuarios = await usuarioService.obtenerUsuarios();

        return res.status(200).json(usuarios);

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            mensaje: "Error al obtener los usuarios"

        });

    }

};

// ======================================
// OBTENER USUARIO POR ID
// ======================================

const obtenerUsuarioPorId = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {

            return res.status(400).json({

                mensaje: "ID de usuario inválido"

            });

        }

        const usuario = await usuarioService.obtenerUsuarioPorId(id);

        if (!usuario) {

            return res.status(404).json({

                mensaje: "Usuario no encontrado"

            });

        }

        return res.status(200).json(usuario);

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            mensaje: "Error al obtener el usuario"

        });

    }

};

// ======================================
// CREAR USUARIO
// ======================================

const crearUsuario = async (req, res) => {

    try {

        const { nombre, correo, password } = req.body || {};

        // VALIDAR CAMPOS

        if (

            typeof nombre !== "string" ||

            typeof correo !== "string" ||

            typeof password !== "string" ||

            !nombre.trim() ||

            !correo.trim() ||

            !password

        ) {

            return res.status(400).json({

                mensaje: "Todos los campos son obligatorios"

            });

        }

        // VALIDAR CORREO

        const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formatoCorreo.test(correo.trim())) {

            return res.status(400).json({

                mensaje: "Correo electrónico inválido"

            });

        }

        // VALIDAR CONTRASEÑA

        if (

            password.length < 12 ||

            Buffer.byteLength(password, "utf8") > 72

        ) {

            return res.status(400).json({

                mensaje: "La contraseña debe tener al menos 12 caracteres y no superar 72 bytes"

            });

        }

        // CREAR USUARIO

        const usuario = await usuarioService.crearUsuario({

            nombre,

            correo,

            password

        });

        return res.status(201).json({

            mensaje: "Usuario registrado correctamente",

            usuario

        });

    } catch (error) {

        if (error.status === 409 || error.code === 11000) {

            return res.status(409).json({

                mensaje: "El correo electrónico ya está registrado"

            });

        }

        console.error(error);

        return res.status(500).json({

            mensaje: "Error al registrar el usuario"

        });

    }

};

// ======================================
// ACTUALIZAR USUARIO
// ======================================

const actualizarUsuario = async (req, res) => {

    try {

        const { id } = req.params;

        const { nombre, correo } = req.body || {};


        // VALIDAR ID

        if (!mongoose.isValidObjectId(id)) {

            return res.status(400).json({

                mensaje: "ID de usuario inválido"

            });

        }


        // VALIDAR CAMPOS

        if (

            typeof nombre !== "string" ||

            typeof correo !== "string" ||

            !nombre.trim() ||

            !correo.trim()

        ) {

            return res.status(400).json({

                mensaje: "Nombre y correo son obligatorios"

            });

        }


        // VALIDAR CORREO

        const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formatoCorreo.test(correo.trim())) {

            return res.status(400).json({

                mensaje: "Correo electrónico inválido"

            });

        }


        const usuario = await usuarioService.actualizarUsuario(

            id,

            { nombre, correo }

        );


        if (!usuario) {

            return res.status(404).json({

                mensaje: "Empleado no encontrado"

            });

        }


        return res.status(200).json({

            mensaje: "Usuario actualizado correctamente",

            usuario

        });

    } catch (error) {

        if (error.code === 11000) {

            return res.status(409).json({

                mensaje: "El correo ya está registrado"

            });

        }

        console.error(error);

        return res.status(500).json({

            mensaje: "Error al actualizar el usuario"

        });

    }

};

// ======================================
// CAMBIAR ESTADO DEL USUARIO
// ======================================

const cambiarEstadoUsuario = async (req, res) => {

    try {

        const { id } = req.params;

        const { activo } = req.body || {};


        // VALIDAR ID

        if (!mongoose.isValidObjectId(id)) {

            return res.status(400).json({

                mensaje: "ID de usuario inválido"

            });

        }


        // VALIDAR ESTADO

        if (typeof activo !== "boolean") {

            return res.status(400).json({

                mensaje: "El estado debe ser true o false"

            });

        }


        const usuario = await usuarioService.cambiarEstadoUsuario(

            id,

            activo

        );


        if (!usuario) {

            return res.status(404).json({

                mensaje: "Empleado no encontrado"

            });

        }


        return res.status(200).json({

            mensaje: activo

                ? "Usuario activado correctamente"

                : "Usuario desactivado correctamente",

            usuario

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            mensaje: "Error al cambiar el estado del usuario"

        });

    }

};

module.exports = {

    obtenerUsuarios,

    obtenerUsuarioPorId,

    crearUsuario,

    actualizarUsuario,

    cambiarEstadoUsuario

};