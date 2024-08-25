const router = require("express").Router();
// const User = require("../model/User.js");
// const Role = require("../model/Role.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { User, Role } = require('../model/associations');

// Endpoint to fetch all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['userId', 'username', 'email', 'roleId', 'isActive'], // Especifica los campos a devolver si es necesario
        });

        return res.status(200).json({
            ok: true,
            status: 200,
            message: "Users retrieved successfully.",
            data: users
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

// Endpoint to save a new user.
router.post("/users",async( req, res) =>{
    const {username, email, password, roleId, createdBy } = req.body;

    try {
         // Validar que todos los campos requeridos estén presentes
         if (!username || !email || !password) {
            return res.status(400).json({
                ok: false,
                status: 400,
                message: "Missing required fields: userName, email, or password."
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
        if (!username || !email || !password ||!updatedBy) {
            return res.status(400).json({
                ok: false,
                status: 400,
                message: "Missing required fields: username, email, or password."
            });
        }
        const user = await User.findOne({
            where: { userId: userId },
        });
        
        // Si el usuario ya está desactivado, omitir la actualización
        if (!user.isActive) {
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