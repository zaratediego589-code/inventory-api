const Producto = require('../models/Producto');

// Registrar producto
const crearProducto = async (datos) => {
    const producto = new Producto(datos);
    return await producto.save();
};



// Consultar productos con filtros y paginación
const obtenerProductos = async (filtros = {}) => {
    const consulta = {};

    const pagina = Math.max(
        1, parseInt(filtros.pagina, 10) || 1
    );

    const limite = Math.min(
        100, Math.max(1, parseInt(filtros.limite, 10) || 10)
    );

    const saltar = (pagina - 1) * limite;

    if (typeof filtros.nombre === 'string' && filtros.nombre) {
        const nombreSeguro = filtros.nombre.replace(
            /[.*+?^${}()|[\]\\]/g, '\\$&'
        );

        consulta.nombre = {
            $regex: nombreSeguro,
            $options: 'i'
        };
    }

    if (typeof filtros.categoria === 'string' && filtros.categoria) {
        consulta.categoria = filtros.categoria;
    }

    const productos = await Producto.find(consulta)
        .sort({ _id: 1 })
        .skip(saltar)
        .limit(limite);

    const total = await Producto.countDocuments(consulta);

    return {
        total,
        pagina,
        limite,
        totalPaginas: Math.ceil(total / limite),
        productos
    };
};



// Consultar producto por ID
const obtenerProductoPorId = async (id) => {
    return await Producto.findById(id);
};

// Actualizar producto
const actualizarProducto = async (id, datos) => {
    return await Producto.findByIdAndUpdate(
        id,
        datos,
        {
            new: true,
            runValidators: true
        }
    );
};

// Eliminar producto
const eliminarProducto = async (id) => {
    return await Producto.findByIdAndDelete(id);
};

// Consultar todas las categorías
const obtenerCategorias = async () => {

    const categorias = await Producto.distinct('categoria');

    return categorias.sort();

};


// Obtener estadísticas del inventario
const obtenerEstadisticas = async () => {

    const resultado = await Producto.aggregate([

        {
            $group: {

                _id: null,

                totalProductos: {
                    $sum: 1
                },

                totalUnidades: {
                    $sum: "$stock"
                },

                valorInventario: {
                    $sum: {
                        $multiply: ["$precio", "$stock"]
                    }
                },

                stockBajo: {
                    $sum: {
                        $cond: [
                            { $lte: ["$stock", 5] },
                            1,
                            0
                        ]
                    }
                }

            }
        }

    ]);

    return resultado[0] || {
        totalProductos: 0,
        totalUnidades: 0,
        valorInventario: 0,
        stockBajo: 0
    };

};

const obtenerProductosPorCategoria = async () => {

    return await Producto.aggregate([

        {
            $group: {
                _id: "$categoria",
                cantidad: { $sum: 1 }
            }
        },

        {
            $project: {
                _id: 0,
                categoria: "$_id",
                cantidad: 1
            }
        },

        {
            $sort: { cantidad: -1 }
        }

    ]);

};

const obtenerStockPorProducto = async () => {

    return await Producto.find()
        .select("nombre stock -_id")
        .sort({ stock: -1 })
        .limit(10);

};

// ======================================
// OBTENER PRODUCTOS CON STOCK BAJO
// ======================================

const obtenerAlertasStock = async () => {

    return await Producto.find({

        stock: { $lte: 5 }

    })
        .select("nombre categoria stock")
        .sort({ stock: 1 });

};


module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProducto,
    obtenerCategorias,
    obtenerEstadisticas,
    obtenerProductosPorCategoria,
    obtenerStockPorProducto,
    obtenerAlertasStock
};
