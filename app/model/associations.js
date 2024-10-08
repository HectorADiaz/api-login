const User = require("./User");
const Role = require("./Role");
const Provider = require('./Provider');  
const EntityAccount = require('./EntityAccount');  
const BankAccount = require("./BankAccount");
const Bank = require("./Bank");
const AccountType = require("./accountType");
 

// Asociaciones de Usuario y Roles
User.belongsTo(Role, { foreignKey: "roleId" });

// Asociaciones de Provider y EntityAccount
Provider.hasMany(EntityAccount, { foreignKey: 'providersId' });
EntityAccount.belongsTo(Provider, { foreignKey: 'providersId' });

// Asociaciones de EntityAccount y BankAccount
EntityAccount.belongsTo(BankAccount, { foreignKey: 'bankAccountId' });
BankAccount.hasMany(EntityAccount, { foreignKey: 'bankAccountId' }); // Relación inversa

// Asociaciones de BankAccount y Bank
BankAccount.belongsTo(Bank, { foreignKey: 'bankId' });
Bank.hasMany(BankAccount, { foreignKey: 'bankId' }); // Relación inversa

BankAccount.belongsTo(AccountType, { foreignKey: 'accountTypeId' });
AccountType.hasMany(BankAccount, { foreignKey: 'accountTypeId' }); // Relación inversa


module.exports = { Provider, EntityAccount, BankAccount, Bank };