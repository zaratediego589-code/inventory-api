const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({

    nombre: {

        type: String,
        required: true,
        trim: true

    },

    correo: {

        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true

    },

    password: {

        type: String,
        required: true,
        select: false

    },

    rol: {

        type: String,
        enum: ["administrador", "empleado"],
        default: "empleado"

    },

    activo: {

        type: Boolean,
        default: true

    },

    tokenVersion: {

        type: Number,
        default: 0

    }

}, {

    timestamps: true

});

module.exports = mongoose.model("Usuario", usuarioSchema);
