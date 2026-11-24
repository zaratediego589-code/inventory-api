
# Inventory API

API REST para la gestión de inventarios desarrollada
con Node.js, Express y MongoDB.

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB
- Mongoose
- JavaScript
- dotenv
- Postman

## Funcionalidades

- Registro de productos.
- Consulta de productos.
- Búsqueda por ID.
- Actualización de productos.
- Eliminación de productos.
- Filtros por nombre y categoría.
- Paginación de resultados.
- Validación de datos.
- Manejo de errores HTTP.
- Configuración mediante variables de entorno.

## Arquitectura

El proyecto utiliza una arquitectura por capas:

- Routes: definición de endpoints.
- Controllers: peticiones y respuestas HTTP.
- Services: lógica de negocio.
- Models: estructura y acceso a los datos.
- Config: conexión a la base de datos.

## Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | /api/productos | Crear producto |
| GET | /api/productos | Listar productos |
| GET | /api/productos/:id | Buscar por ID |
| PUT | /api/productos/:id | Actualizar producto |
| DELETE | /api/productos/:id | Eliminar producto |

## Instalación

1. Clonar el repositorio.
2. Ejecutar `npm install`.
3. Crear un archivo .env basado en .env.example.
4. Iniciar MongoDB.
5. Ejecutar `node server.js`.

El servidor estará disponible en:

http://localhost:3000

## Ejemplo de producto

{
    "nombre": "Laptop Acer",
    "precio": 11999,
    "stock": 8,
    "categoria": "Computadoras"
}

## Autor

Diego Alejandro Rodríguez Zárate

GitHub: https://github.com/zaratediego589-code
