const authService = require("../services/authService");


// ======================================
// INICIAR SESION
// ======================================

const iniciarSesion = async (req, res) => {

    try {

        const { correo, password } = req.body || {};


        // VALIDAR CAMPOS

        if (
            typeof correo !== "string" ||
            typeof password !== "string" ||
            !correo.trim() ||
            !password
        ) {

            return res.status(400).json({

                mensaje: "El correo y la contraseña son obligatorios"

            });

        }


        // LLAMAR AL SERVICIO

        const resultado = await authService.iniciarSesion(

            correo,

            password

        );


        // VERIFICAR CREDENCIALES

        if (!resultado) {

            return res.status(401).json({

                mensaje: "Correo o contraseña incorrectos"

            });

        }


        // RESPUESTA EXITOSA

        return res.status(200).json({

            mensaje: "Inicio de sesión correcto",

            token: resultado.token,

            usuario: resultado.usuario

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            mensaje: "Error interno del servidor"

        });

    }

};


module.exports = {

    iniciarSesion

};
