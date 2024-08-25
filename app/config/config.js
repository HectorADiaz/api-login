module.exports = {
    PORT: process.env.PORT || 3000,
    DB: {
        database: process.env.DB_NAME || 'db-login-dev',
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '', // Dejarlo vacío si no hay contraseña
        host: process.env.DB_HOST || 'localhost',
        dialect: process.env.DB_DIALECT || 'mysql', // Dialecto para MySQL
        port: process.env.DB_PORT || 3306
    }
}