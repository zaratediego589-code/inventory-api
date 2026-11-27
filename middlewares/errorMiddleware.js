const manejarErrores = (error, req, res, next) => {

    if (res.headersSent) {

        return next(error);

    }

    console.error(error);


    // JSON INVALIDO

    if (error.type === "entity.parse.failed") {

        return res.status(400).json({

            mensaje: "El formato JSON es inválido"

        });

    }


    // ERROR DE VALIDACION DE MONGOOSE

    if (error.name === "ValidationError") {

        return res.status(400).json({

            mensaje: "Los datos proporcionados no son válidos"

        });

    }


    // ID INVALIDO

    if (error.name === "CastError") {

        return res.status(400).json({

            mensaje: "Identificador inválido"

        });

    }


    // REGISTRO DUPLICADO

    if (error.code === 11000) {

        return res.status(409).json({

            mensaje: "El registro ya existe"

        });

    }


    // ERROR INTERNO

    return res.status(500).json({

        mensaje: "Error interno del servidor"

    });

};

module.exports = manejarErrores;
