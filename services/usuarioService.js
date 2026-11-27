const Usuario = require("../models/Usuario");

const bcrypt = require("bcryptjs");

// ======================================
// OBTENER USUARIOS
// ======================================

const obtenerUsuarios = async () => {

    return await Usuario.find()

        .select("-password")

        .sort({ createdAt: -1 });

};

// ======================================
// OBTENER USUARIO POR ID
// ======================================

const obtenerUsuarioPorId = async (id) => {

    return await Usuario.findById(id)

        .select("-password");

};

// ======================================
// CREAR USUARIO
// ======================================

const crearUsuario = async (datos) => {

    const { nombre, correo, password } = datos;

    const correoNormalizado = correo.trim().toLowerCase();

    // VERIFICAR CORREO EXISTENTE

    const usuarioExistente = await Usuario.findOne({

        correo: correoNormalizado

    });

    if (usuarioExistente) {

        const error = new Error(
            "El correo electrónico ya está registrado"
        );

        error.status = 409;

        throw error;

    }

    // PROTEGER CONTRASEÑA

    const passwordHash = await bcrypt.hash(

        password,

        12

    );

    // CREAR EMPLEADO

    const usuario = new Usuario({

        nombre: nombre.trim(),

        correo: correoNormalizado,

        password: passwordHash,

        rol: "empleado",

        activo: true

    });

    await usuario.save();

    // DEVOLVER DATOS SIN CONTRASEÑA

    return {

        _id: usuario._id,

        nombre: usuario.nombre,

        correo: usuario.correo,

        rol: usuario.rol,

        activo: usuario.activo,

        createdAt: usuario.createdAt

    };

};

// ======================================
// ACTUALIZAR USUARIO
// ======================================

const actualizarUsuario = async (id, datos) => {

    return await Usuario.findOneAndUpdate(

        {
            _id: id,
            rol: "empleado"
        },

        {
            nombre: datos.nombre.trim(),

            correo: datos.correo.trim().toLowerCase()
        },

        {
            new: true,
            runValidators: true
        }

    ).select("-password");

};

// ======================================
// CAMBIAR ESTADO DEL USUARIO
// ======================================


const cambiarEstadoUsuario = async (id, activo) => {

    const cambios = {

        $set: {

            activo: activo

        }

    };

    // INVALIDAR TOKENS AL DESACTIVAR

    if (!activo) {

        cambios.$inc = {

            tokenVersion: 1

        };

    }

    return await Usuario.findOneAndUpdate(

        {

            _id: id,

            rol: "empleado"

        },

        cambios,

        {

            new: true,

            runValidators: true

        }

    ).select("-password");

};


module.exports = {

    obtenerUsuarios,

    obtenerUsuarioPorId,

    crearUsuario,

    actualizarUsuario,

    cambiarEstadoUsuario

};