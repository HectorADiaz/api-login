const router = require("express").Router();
// const User = require("../model/User.js");
// const Role = require("../model/Role.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require('../model/User'); // Ajusta la ruta según tu estructura de archivos
const Role = require('../model/Role'); // Asegúrate de importar el modelo Role


require('../model/associations'); // Asegúrate de que este archivo se cargue primero

// Endpoint to fetch all users
router.get('/users', async (req, res) => {
    const ip = req.ip;

    try {
        const users = await User.findAll({
            attributes: ['userId', 'username', 'email', 'roleId', 'isActive'],
            include: [{
                model: Role,
                attributes: ['roleId', 'name'] // Especifica los campos que deseas del rol
            }]
        });

        const usersWithRole = users.map(user => ({
            userId: user.userId,
            username: user.username,
            email: user.email,
            isActive: user.isActive,
            role: {
                roleId: user.roleId, // Mantenemos el roleId
                name: user.Role.name // Añadimos el campo name del Role
            }
        }));

        return res.status(200).json({
            ok: true,
            status: 200,
            message: "Users retrieved successfully.",
            data: usersWithRole
        });
    } catch (error) {

        console.error("Error fetching users:", error); //depuración en el servidor

        return res.status(500).json({
            ok: false,
            status: 500,
            message: "An error occurred while retrieving users."+res.body,
            error: error.message
        });
    }
});

// TODO en el front con nanoId
// Endpoint to fetch a user by ID
router.get('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Validar que el ID sea un número
        if (isNaN(id)) {
            return res.status(400).json({
                ok: false,
                status: 400,
                message: "Invalid user ID."
            });
        }

        const user = await User.findOne({
            where: { userId: id },
            attributes: ['userId', 'username', 'email', 'isActive'], // Especifica los campos del usuario
            include: [{
                model: Role,
                attributes: ['roleId', 'name'] // Campos del modelo Role
            }]
        });

        // Validar si el usuario no existe
        if (!user) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "User not found."
            });
        }

        return res.status(200).json({
            ok: true,
            status: 200,
            message: "User retrieved successfully.",
            data: user
        });

    } catch (error) {
        console.error("Error fetching user by ID:", error);
        return res.status(500).json({
            ok: false,
            status: 500,
            message: "An error occurred while retrieving the user.",
            error: error.message
        });
    }
});

// Función para validar la entrada de usuario
async function validateUserInput({ username, email, password }) {
    const errors = [];

    // Validación de username
    if (!username || typeof username !== 'string' || username.length < 3 || username.length > 20) {
        errors.push('El username debe tener entre 3 y 20 caracteres y ser una cadena.');
    }

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
        errors.push('El username solo puede contener caracteres alfanuméricos y guiones bajos.');
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.push('El formato del email no es válido.');
    }

    // Validación de password
    if (!password || password.length < 8) {
        errors.push('La contraseña debe tener al menos 8 caracteres.');
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
        errors.push('La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial.');
    }

    if (errors.length > 0) {
        throw new Error(JSON.stringify(errors));
    }
}

// Endpoint to save a new user.
router.post("/users",async( req, res) =>{
    const {username, email, password, roleId, createdBy } = req.body;
    console.log(req.body)
    try {
         // Validaciones de formato 
        const errors = await validateUserInput({ username, email, password });
        // const existingUser = await Promise.all([
        //     User.findOne({ where: { username } })
        // ]);
        const existingUser = await User.findOne({ where: { username: username } });

        // const existingUser = await User.findOne({ username })

        console.error("Error fetching user by ID:", existingUser);
     
        if( existingUser  ){
            return res.status(400).json({
                ok: false,
                status: 400,
                mensaje: 'Eal username ya está en uso',
            }); 
        }

        // Hash de la contraseña
        const hashedPass = await bcrypt.hash(password, saltRounds);
 
        // Crear nuevo usuario en la base de datos
        const newUser = await User.create({
            username,
            email,
            password: hashedPass,
            roleId,
            createdBy
        });

        return res.status(201).json({
            ok: true,
            status: 201,
            mensaje: "User create sucessfull",
        });
    } catch (error) {

        console.error("Error creating user:", error);

      if (error.name === "SequelizeValidationError") {
            return res.status(400).json({
                ok: false,
                status: 400,
                message: "Validation error occurred.",
                error: error.errors.map(err => err.message)
            });
        }

        return res.status(500).json({
            ok: false,
            status: 500,
            message: "An error occurred while creating the user.",
            error: error.message
        });       
    }    
})

// Endpoint to modify a user.
router.put("/users",async( req, res) =>{
    
    // const id = req.params.userId;
    const { userId, username, email, password, roleId, updatedAt,updatedBy,isActive} = req.body;
    
    // Hash de la contraseña
    const hashedPass = await bcrypt.hash(password, saltRounds);
 
    try {
        // Validar que todos los campos requeridos estén presentes
        const errors = await validateUserInput({ username, email, password });
        if (isNaN(roleId)||isNaN(updatedBy)||isNaN(isActive)) {
            return res.status(400).json({
                ok: false,
                status: 400,
                message: "Invalid roleId, unpdateBy or isActive"
            });
        }

        
       
        // Buscar el usuario a actualizar y verificar el username en la misma consulta
        const [userToUpdate, existingUser] = await Promise.all([
            User.findOne({ where: { userId: userId } }),
            User.findOne({ where: { username } })
        ]);

        if (!userToUpdate) {
                return res.status(404).json({
                ok: false,
                status: 404,
                mensaje: 'Usuario no encontrado'
            });
        }
        // Verificar si el username ya está en uso y pertenece a otro usuario
        if (existingUser && existingUser.id !== userId) {
            return res.status(400).json({
                ok: false,
                status: 400,
                message: 'El username ya está en uso'
            });
        }
        
        // Si el usuario ya está desactivado, omitir la actualización
        if (!userToUpdate.isActive) {
            return res.status(200).json({
              ok: true,
              status: 200,
              message: "User is already inactive.",
            });
        }

        await User.update({
            username,
            email,
            password: hashedPass,
            roleId, 
            updatedAt: null,
            updatedBy,
            isActive
        },{
            where:{
                userId : userId
            }
        });

        return res.status(200).json({
            ok: true,
            status: 200,
            mensaje: "User Update sucessfull",
        });
    } catch (error) {
        console.error("Error creating user:", error);

        if (error.name === "SequelizeValidationError") {
              return res.status(400).json({
                  ok: false,
                  status: 400,
                  message: "Validation error occurred.",
                  error: error.errors.map(err => err.message) // Enviar todos los mensajes de validación
              });
          }
  
          return res.status(500).json({
              ok: false,
              status: 500,
              message: "An error occurred while modify the user.",
              error: error.message
          });          
    }
})

// Endpoint to deleted a user.
router.patch("/users/:usersId",async( req, res) =>{
    const id = req.params.usersId;
    try {

        // Validar que el ID sea un número
        if (isNaN(id)) {
            return res.status(400).json({
                ok: false,
                status: 400,
                message: "Invalid user ID."
            });
        }   

        const user = await User.findOne({
            where: { userId: id },
        });
        
        // Verificar si el usuario no existe
        if (!user) {
            return res.status(404).json({
              ok: false,
              status: 404,
              message: "User not found.",
            });
        }

        // Si el usuario ya está desactivado, omitir la actualización
        if (!user.isActive) {
            return res.status(200).json({
              ok: true,
              status: 200,
              message: "User is already inactive.",
            });
        }
        
        // Actualizacion de usuario
        await User.update({
            isActive : false
        },{
            where:{
                userId : id
            }
        });

        return res.status(200).json({
            ok: true,
            status: 200,
            message: "User deleted successfully.",
        });

    } catch (error) {

        console.error("Error fetching user by ID:", error);
        return res.status(500).json({
            ok: false,
            status: 500,
            message: "An error occurred while retrieving the user.",
            error: error.message
        });
    }
})

module.exports = router;