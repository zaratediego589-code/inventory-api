require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/Usuario");


// ======================================
// CREAR ADMINISTRADOR
// ======================================

async function crearAdmin() {

    try {

        const nombre = process.env.ADMIN_NOMBRE;

        const correo = process.env.ADMIN_CORREO
            ?.trim().toLowerCase();

        const password = process.env.ADMIN_PASSWORD;


        // VALIDAR CREDENCIALES

        if (
            !nombre ||
            !correo ||
            !password ||
            password.length < 12 ||
            Buffer.byteLength(password, "utf8") > 72
        ) {

            throw new Error(
                "Configura correctamente las credenciales del administrador"
            );

        }


        // CONECTAR A MONGODB

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB conectado correctamente");


        // VERIFICAR SI EL USUARIO YA EXISTE

        const usuarioExistente = await Usuario.findOne({

            correo: correo

        });


        if (usuarioExistente) {

            console.log("El usuario ya existe");

            return;

        }


        // GENERAR HASH DE CONTRASEÑA

        const passwordHash = await bcrypt.hash(

            password,

            12

        );


        // CREAR USUARIO ADMINISTRADOR

        const administrador = new Usuario({

            nombre: nombre,

            correo: correo,

            password: passwordHash,

            rol: "administrador",

            activo: true

        });


        // GUARDAR EN MONGODB

        await administrador.save();


        console.log("Administrador creado correctamente");

        console.log("Nombre:", administrador.nombre);

        console.log("Correo:", administrador.correo);

        console.log("Rol:", administrador.rol);


    } catch (error) {

        console.error("Error:", error.message);

        process.exitCode = 1;

    } finally {

        await mongoose.disconnect();

        console.log("Conexión cerrada");

    }

}


crearAdmin();
