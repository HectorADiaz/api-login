// const User = require('./User');
// const Role = require('./Role');

// // Definir las asociaciones
// Role.hasMany(User, { foreignKey: 'roleId' });
// User.belongsTo(Role, { foreignKey: 'roleId' });

// // Exportar los modelos
// module.exports = { User, Role };



const User = require('./User');
const Role = require('./Role');

User.belongsTo(Role, { foreignKey: 'roleId' }); // Asegúrate de que este modelo y la clave foránea coincidan