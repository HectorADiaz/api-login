
--   ER
┌────────────────────────────────────────────┐
│                  roles                     │
├────────────────────────────────────────────┤
│ id                    (INT)                │
│ name                  (VARCHAR)            │
│ description           (VARCHAR, NULLABLE)  │
│ createdAt            (DATETIME)           │
│ updatedAt            (DATETIME)           │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│                  users                     │
├────────────────────────────────────────────┤
│ id                    (INT)                │
│ userName              (VARCHAR)            │
│ email                 (VARCHAR)            │
│ password              (VARCHAR)            │
│ roleId               (INT, FOREIGN KEY)   │
│ isActive             (BOOLEAN)            │
│ deleted_at            (DATETIME, NULLABLE) │
│ createdBy            (INT, FOREIGN KEY)   │
│ updatedBy            (INT, FOREIGN KEY)   │
│ createdAt            (DATETIME)           │
│ updatedAt            (DATETIME)           │
└────────────────────────────────────────────┘
 
-- DDL Querys
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    roleId INT,
    isActive BOOLEAN DEFAULT TRUE,
    createdBy INT DEFAULT NULL,
    updatedBy INT DEFAULT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (roleId) REFERENCES roles(id),
    FOREIGN KEY (createdBy) REFERENCES users(id),
    FOREIGN KEY (updatedBy) REFERENCES users(id)
);


-- DML Querys TEST
-- roles
INSERT INTO roles (name, description) VALUES
('ADMIN', 'Full access to all features'),
('DEV', 'Developer role with access to code and deployments'),
('USER', 'Regular user with limited permissions'),
('GUEST', 'Guest user with minimal access');
-- ADMIN
INSERT INTO users (userName, email, password, roleId, createdBy, updatedBy) VALUES
('alice.admin', 'alice.admin@example.com', 'hashed_password_admin1', (SELECT id FROM roles WHERE name = 'ADMIN'), NULL, NULL),
('bob.admin', 'bob.admin@example.com', 'hashed_password_admin2', (SELECT id FROM roles WHERE name = 'ADMIN'), 1, NULL),
('carol.admin', 'carol.admin@example.com', 'hashed_password_admin3', (SELECT id FROM roles WHERE name = 'ADMIN'), 1, NULL);

-- DEV 
INSERT INTO users (userName, email, password, roleId, createdBy, updatedBy) VALUES
('dave.dev', 'dave.dev@example.com', 'hashed_password_dev1', (SELECT id FROM roles WHERE name = 'DEV'), 1, NULL),
('eve.dev', 'eve.dev@example.com', 'hashed_password_dev2', (SELECT id FROM roles WHERE name = 'DEV'), 1, NULL),
('frank.dev', 'frank.dev@example.com', 'hashed_password_dev3', (SELECT id FROM roles WHERE name = 'DEV'), 1, NULL);

-- USER
INSERT INTO users (userName, email, password, roleId, createdBy, updatedBy) VALUES
('grace.user', 'grace.user@example.com', 'hashed_password_user1', (SELECT id FROM roles WHERE name = 'USER'), 1, NULL),
('heidi.user', 'heidi.user@example.com', 'hashed_password_user2', (SELECT id FROM roles WHERE name = 'USER'), 1, NULL),
('ivan.user', 'ivan.user@example.com', 'hashed_password_user3', (SELECT id FROM roles WHERE name = 'USER'), 1, NULL);

-- GUEST
INSERT INTO users (userName, email, password, roleId, createdBy, updatedBy) VALUES
('judy.guest', 'judy.guest@example.com', 'hashed_password_guest1', (SELECT id FROM roles WHERE name = 'GUEST'), 1, NULL),
('karl.guest', 'karl.guest@example.com', 'hashed_password_guest2', (SELECT id FROM roles WHERE name = 'GUEST'), 1, NULL),
('leo.guest', 'leo.guest@example.com', 'hashed_password_guest3', (SELECT id FROM roles WHERE name = 'GUEST'), 1, NULL);













CREATE TABLE modules (
    moduleId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE operations (
    operationsId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    modulesId INT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    FOREIGN KEY (modulesId) REFERENCES modules(modulesId),
);

CREATE TABLE roles (
    roleId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE usuarios (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    roleId INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL
    FOREIGN KEY (roleId) REFERENCES roles(roleId),
);

CREATE TABLE role_Operation (
    operationId INT AUTO_INCREMENT PRIMARY KEY,
    roleId INT,
    operationId INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL
    FOREIGN KEY (roleId) REFERENCES roles(roleId),
    FOREIGN KEY (operationId) REFERENCES operations(operationId),

);




-- TABLAS OK

-- 1. Crear la tabla de módulos (modules)
CREATE TABLE modules (
    moduleId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Crear la tabla de roles (roles)
CREATE TABLE typeOperations (
    typeOperationId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- 2.1 Crear la tabla de operaciones (operations)
CREATE TABLE operations (
    operationId INT AUTO_INCREMENT PRIMARY KEY,
    typeOperationId INT,
    moduleId INT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (moduleId) REFERENCES modules(moduleId) ON DELETE SET NULL,
    FOREIGN KEY (typeOperationId) REFERENCES typeOperations(typeOperationId) ON DELETE SET NULL

);
-- 3 Crear la tabla de roles (roles)
CREATE TABLE roles (
    roleId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. Crear la tabla de usuarios (users)
CREATE TABLE users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    roleId INT,
    isActive BOOLEAN DEFAULT TRUE,
    createdBy INT DEFAULT NULL,
    updatedBy INT DEFAULT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (roleId) REFERENCES roles(roleId) ON DELETE SET NULL
);

-- 5. Crear la tabla de relación entre roles y operaciones (role_operations)
CREATE TABLE roleOperations (
    roleOperationId INT AUTO_INCREMENT PRIMARY KEY,
    roleId INT,
    operationId INT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (roleId) REFERENCES roles(roleId) ON DELETE CASCADE,
    FOREIGN KEY (operationId) REFERENCES operations(operationId) ON DELETE CASCADE
);

 
CREATE TABLE clients (
    clientId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    clientName VARCHAR(100) NOT NULL, -- userName del cliente
    firstName VARCHAR(100) NOT NULL, -- Nombre del cliente
    lastName VARCHAR(100) NOT NULL, -- apellido del cliente
    email VARCHAR(100), -- Correo electrónico
    phone VARCHAR(15) NOT NULL, -- Teléfono de contacto
    nit VARCHAR(15) NOT NULL, -- nit de cliente
    address TEXT NOT NULL, -- Dirección del cliente
    isActive BOOLEAN DEFAULT TRUE, -- 1: Activo, 0: Inactivo (Eliminación lógica)
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Fecha de actualización
    deletedAt TIMESTAMP NULL DEFAULT NULL, -- Para eliminación lógica
    createdBy INT UNSIGNED, -- Usuario que creó el registro
    updatedBy INT UNSIGNED, -- Usuario que actualizó el registro
    deletedBy INT UNSIGNED -- Usuario que eliminó el registro
);
-- Índices
CREATE INDEX idx_clients_name ON clients (clientName);
CREATE INDEX idx_clients_email ON clients (email);



CREATE TABLE banks (
    bankId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    bankName VARCHAR(100) NOT NULL -- Nombre del banco 
);

CREATE TABLE accountTypes (
    accountTypeId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    typeName VARCHAR(50) NOT NULL, -- Nombre del tipo de cuenta (Monetario, ahorro, etc...)
);

-- 

CREATE TABLE bankAccounts (
    bankAccountId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    bankId INT UNSIGNED, -- ID del banco (relacionado con tabla banks)
    accountNumber VARCHAR(30) NOT NULL, -- Número de cuenta
    accountName VARCHAR(100) NOT NULL, -- Nombre de la cuenta
    accountTypeId INT UNSIGNED NOT NULL, -- Tipo de cuenta (relacionado con tabla accountTypes)
    isActive BOOLEAN DEFAULT TRUE, -- 1: Activo, 0: Inactivo
    typeAccounts ENUM('propietary', 'provider') NOT NULL, -- Tipo de cuenta ('propietary' o 'provider')
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL DEFAULT NULL, -- Eliminación lógica
    createdBy INT UNSIGNED,
    updatedBy INT UNSIGNED,
    deletedBy INT UNSIGNED,
    FOREIGN KEY (bankId) REFERENCES banks(bankId) ON DELETE CASCADE,
    FOREIGN KEY (accountTypeId) REFERENCES accountTypes(accountTypeId) ON DELETE CASCADE
);
-- Índices 
CREATE INDEX idx_bank_accounts_number ON bankAccounts (accountNumber);

 
CREATE TABLE providers (
    providersId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    businessName VARCHAR(150) NOT NULL, -- Razón Social
    commercialName VARCHAR(150) NOT NULL, -- Nombre Comercial
    fiscalAddress TEXT NOT NULL, -- Domicilio Fiscal
    nit VARCHAR(20) NOT NULL, -- NIT o número de identificación tributaria
    phone VARCHAR(15), -- Teléfono del proveedor
    email VARCHAR(100), -- Correo electrónico del proveedor
    managerName VARCHAR(100), -- Nombre del gerente
    managerPhone VARCHAR(15), -- Teléfono del gerente
    isActive BOOLEAN DEFAULT TRUE, -- 1: Activo, 0: Inactivo
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL DEFAULT NULL, -- Eliminación lógica
    createdBy INT UNSIGNED,
    updatedBy INT UNSIGNED,
    deletedBy INT UNSIGNED,
);
-- Índices
CREATE INDEX idx_providers_business_name ON providers (commercialName);
CREATE INDEX idx_providers_nit ON providers (nit);


-- Tabla relacional 
-- 
CREATE TABLE EntityAccounts (
    entityAccountsId INT AUTO_INCREMENT PRIMARY KEY,
    providersId INT UNSIGNED NOT NULL,
    bankAccountId INT UNSIGNED NOT NULL,
    createdBy VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedBy VARCHAR(50),
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Relaciones
    FOREIGN KEY (providersId) REFERENCES providers(providersId) ON DELETE CASCADE,
    FOREIGN KEY (bankAccountId) REFERENCES bankAccounts(bankAccountId) ON DELETE CASCADE
);
-- Índices para mejorar el rendimiento en consultas con claves foráneas
CREATE INDEX idx_entity_accounts_provider ON EntityAccounts (providersId);
CREATE INDEX idx_entity_accounts_bank_account ON EntityAccounts (bankAccountId);

entre proveedores y bankAccounts
            1           1
            1           2