const Sequelize = require('sequelize');
const config = require('../config/config');

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize(
    config.DB.database,
    config.DB.username,
    config.DB.password,
    {
        host: config.DB.host,
        dialect: config.DB.dialect,
        port:config.DB.port,
        // Otras opciones de configuración según sea necesario
    }
);

// Probar la conexión
sequelize.authenticate()
    .then(() => {
        console.log('Conexión establecida correctamente.');
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos:', err);
    });

module.exports = sequelize;