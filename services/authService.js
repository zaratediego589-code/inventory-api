const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ======================================
// INICIAR SESION
// ======================================

const iniciarSesion = async (correo, password) => {

    // VALIDAR CREDENCIALES

    if (
        typeof correo !== "string" ||
        typeof password !== "string" ||
        !correo.trim() ||
        !password
    ) {
        return null;
    }


    // BUSCAR USUARIO

    const usuario = await Usuario.findOne({

        correo: correo.trim().toLowerCase(),

        activo: true

    }).select("+password");


    // VERIFICAR SI EXISTE

    if (!usuario) {

        return null;

    }


    // COMPARAR CONTRASEÑA

    const passwordValida = await bcrypt.compare(

        password,

        usuario.password

    );


    if (!passwordValida) {

        return null;

    }


    // GENERAR TOKEN JWT

        const token = jwt.sign(

        {

            id: usuario._id.toString(),

            rol: usuario.rol,

            tokenVersion: usuario.tokenVersion ?? 0

        },

        process.env.JWT_SECRET,

        {

            algorithm: "HS256",

            expiresIn: process.env.JWT_EXPIRES_IN || "8h"

        }

    );


    // DEVOLVER INFORMACION DEL USUARIO

    return {

        token,

        usuario: {

            id: usuario._id,

            nombre: usuario.nombre,

            correo: usuario.correo,

            rol: usuario.rol

        }

    };

};


module.exports = {

    iniciarSesion

};
