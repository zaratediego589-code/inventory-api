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

// Exportar funciones
module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProducto
};
