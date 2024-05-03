
# API de Gestión de Películas

Esta es una API para gestionar películas, donde los usuarios pueden buscar, crear, actualizar y eliminar películas, también incluye los siguientes roles: Administrador y Usuario.


## Dependencias

- `bcrypt: ^5.1.1`
- `dotenv: ^16.4.5`
- `express: ^4.19.2`
- `jsonwebtoken: ^9.0.2`
- `mongodb: ^6.5.0`
- `mongoose: ^8.3.3`

## Dependencias de desarrollo

- `jest: ^29.7.0`
- `nodemon: ^3.1.0`
- `supertest: ^7.0.0`

## Instalación

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias ejecutando `npm install`.


## Configuración

1. Asegúrate de tener una base de datos MongoDB en funcionamiento.
2. Crea un archivo `.env` en la raíz del proyecto y proporciona la configuración necesaria. Aquí tienes un ejemplo de las variables de entorno necesarias:

```
PORT=3000
DB_CONNECTION_STRING=<URL de conexión a tu base de datos MongoDB>
SECRET=<Tu clave secreta para firmar tokens JWT>
```

## Uso

1. Inicia el servidor ejecutando `npm start`.
2. Puedes acceder a la API a través de `http://localhost:3000`.

## Endpoints

### Autenticación

- `POST /auth/register`: Registra un nuevo usuario.
- `POST /auth/login`: Inicia sesión con un usuario existente.

### Películas

- `GET /movies`: Obtiene todas las películas.
- `GET /movies/:movieId`: Obtiene una película específica por su ID.
- `POST /movies`: Crea una nueva película (solo accesible para administradores).
- `PUT /movies/:movieId`: Actualiza una película existente (solo accesible para administradores).
- `DELETE /movies/:movieId`: Elimina una película existente (solo accesible para administradores).

## Autor

Este proyecto fue desarrollado por Tomas Gaitan (https://github.com/tomasgaitan14).

## Contribución

Las contribuciones son bienvenidas. Si deseas contribuir a este proyecto, sigue estos pasos: 👇🏻

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz commit (`git commit -am 'Agrega una nueva característica'`).
4. Haz push a la rama (`git push origin feature/nueva-caracteristica`).
5. Abre un pull request.

