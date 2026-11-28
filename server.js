require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const conectarDB = require("./config/db");

const productoRoutes = require("./routes/productoRoutes");
const authRoutes = require("./routes/authRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");

const manejarErrores = require("./middlewares/errorMiddleware");


// ======================================
// INICIALIZAR EXPRESS
// ======================================

const app = express();

if (process.env.TRUST_PROXY === "1") {
    app.set("trust proxy", 1);
}

const PORT = process.env.PORT || 3000;


// ======================================
// SEGURIDAD HTTP
// ======================================

app.use(helmet());

app.disable("x-powered-by");


// ======================================
// MIDDLEWARES
// ======================================

// ======================================
// CONFIGURACION DE CORS
// ======================================

const corsOptions = {

    origin: process.env.FRONTEND_URL || "http://localhost:5500",

    methods: [

        "GET",

        "POST",

        "PUT",

        "PATCH",

        "DELETE",

        "OPTIONS"

    ],

    allowedHeaders: [

        "Content-Type",

        "Authorization"

    ]

};

app.use(cors(corsOptions));


app.use(express.json());


// ======================================
// LIMITE DE INTENTOS DE INICIO DE SESION
// ======================================

const loginLimiter = rateLimit({

    windowMs: 15 * 60 * 1000,

    limit: 5,

    standardHeaders: "draft-7",

    legacyHeaders: false,

    skipSuccessfulRequests: true,

    message: {

        mensaje: "Demasiados intentos de inicio de sesión. Intenta nuevamente en 15 minutos."

    }

});


// ======================================
// RUTA PRINCIPAL
// ======================================

app.get("/", (req, res) => {

    res.send("Bienvenido a Inventory API");

});


// ======================================
// RUTAS DE PRODUCTOS
// ======================================

app.use("/api/productos", productoRoutes);


// ======================================
// RUTAS DE AUTENTICACION
// ======================================

app.use("/api/auth/login", loginLimiter);

app.use("/api/auth", authRoutes);


// ======================================
// RUTAS DE USUARIOS
// ======================================

app.use("/api/usuarios", usuarioRoutes);

// ======================================
// MANEJAR RUTAS INEXISTENTES
// ======================================

app.use((req, res) => {

    res.status(404).json({

        mensaje: "Ruta no encontrada"

    });

});


// ======================================
// MANEJADOR GLOBAL DE ERRORES
// ======================================

app.use(manejarErrores);


// ======================================
// CONECTAR BASE DE DATOS
// ======================================

conectarDB();


// ======================================
// INICIAR SERVIDOR
// ======================================

app.listen(PORT, "0.0.0.0", () => {

    console.log(`Servidor ejecutándose en el puerto ${PORT}`);

});


