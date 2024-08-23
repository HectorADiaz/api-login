const sequelize = require('../app/config/database');
const CONFIG = require('../app/config/config');
const App = require('./app');
//require('dotenv').config();

sequelize.authenticate()
    .then(() => {
        console.log('Conexión establecida correctamente.');
        App.listen(CONFIG.PORT, function(error) {
            if (error) return console.log(error);
            console.log(`Servidor corriendo en el puerto: ${CONFIG.PORT}`);
        });
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos:', err);
    });