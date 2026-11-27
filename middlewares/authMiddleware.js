const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");


// ======================================
// VERIFICAR AUTENTICACION
// ======================================

const verificarToken = async (req, res, next) => {

    const authorization = req.headers.authorization;


    // VERIFICAR ENCABEZADO

    if (
        !authorization ||
        !authorization.startsWith("Bearer ")
    ) {

        return res.status(401).json({

            mensaje: "Token de acceso requerido"

        });

    }


    // EXTRAER TOKEN

    const token = authorization.split(" ")[1];

    let datos;

    try {

        // VERIFICAR TOKEN

        datos = jwt.verify(

            token,

            process.env.JWT_SECRET,

            {
                algorithms: ["HS256"]
            }

        );

    } catch (error) {

        return res.status(401).json({

            mensaje: "Token inválido o expirado"

        });

    }


    try {

        // BUSCAR USUARIO

        const usuario = await Usuario.findById(datos.id);


        // VERIFICAR CUENTA

        if (!usuario || !usuario.activo) {

            return res.status(401).json({

                mensaje: "Usuario no autorizado"

            });

        }

        // ======================================
        // VALIDAR VERSION DEL TOKEN
        // ======================================

        if (datos.tokenVersion !== (usuario.tokenVersion ?? 0)) {

            return res.status(401).json({

                mensaje: "La sesión ha sido invalidada"

            });

        }


        // GUARDAR USUARIO EN LA PETICION

        req.usuario = {

            id: usuario._id,

            nombre: usuario.nombre,

            correo: usuario.correo,

            rol: usuario.rol

        };


        // CONTINUAR CON LA PETICION

        next();

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            mensaje: "Error interno del servidor"

        });

    }

};


module.exports = verificarToken;
