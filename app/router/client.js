const router = require("express").Router();
const { Client } = require("../model/Client");

router.get("/client", async (req, res) => {
  try {
    const clients = await Client.findAll({
      where: { isActive: true },
      attributes: [
        "clientId",
        "clientName",
        "firstName",
        "lastName",
        "email",
        "phone",
        "nit",
        "address",
        "isActive",
        "createdAt"
      ],
    });  
    return res.status(200).json({
      ok: true,
      status: 200,
      message: "Client retrieved successfully.",
      data: clients,
    });
  } catch (error) {
    console.error("Error fetching clients:", error);

    return res.status(500).json({
      ok: false,
      status: 500,
      message: "An error occurred while retrieving clients.",
      error: error.message,
    });
  }
});

router.get("/client/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Validar que el ID sea un número
    if (isNaN(id)) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "Invalid client ID.",
      });
    }
    const clients = await Client.findOne({
      where: { clientId: id },
      attributes: [
        "clientId",
        "clientName",
        "firstName",
        "lastName",
        "email",
        "phone",
        "nit",
        "address",
        "isActive",
        "createdAt"
      ],
    });

    // Validar si el usuario no existe
    if (!clients) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "client not found.",
      });
    }

    return res.status(200).json({
      ok: true,
      status: 200,
      message: "Client retrieved successfully.",
      data: clients,
    });
  } catch (error) {
    console.error("Error fetching clients:", error);

    return res.status(500).json({
      ok: false,
      status: 500,
      message: "An error occurred while retrieving clients.",
      error: error.message,
    });
  }
});

// para guardr un nuevo registro
router.post("/clients", async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, email, phone, nit, address } = req.body;
  try {
    const errors = await validateClientInput({
      firstName,
      lastName,
      email,
      phone,
      nit,
      address,
    });

    clientName = await generateUniqueClientName(firstName, lastName);

    // Crear nuevo usuario en la base de datos
    const newClient = await Client.create({
      clientName,
      firstName,
      lastName,
      email,
      phone,
      nit,
      address,
      // createdBy //TODO falta agregar campos de auditoria
    });

    return res.status(201).json({
      ok: true,
      status: 201,
      mensaje: "Client create sucessfull",
    });
  } catch (error) {
    console.error("Error creating user:", error);

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "Validation error occurred.",
        error: error.errors.map((err) => err.message),
      });
    }

    return res.status(500).json({
      ok: false,
      status: 500,
      message: "An error occurred while creating the client.",
      error: error.message,
    });
  }
});

// Enpoint para editar un usuario
router.put("/client", async (req, res) => {
  const { clientId, firstName, lastName, email, phone, nit, address } =
    req.body;

  try {
    const errors = await validateClientInput({
      firstName,
      lastName,
      email,
      phone,
      nit,
      address,
    });

    const [userToUpdate] = await Promise.all([
      Client.findOne({ where: { clientId: clientId } }),
    ]);


    if (!userToUpdate) {
      return res.status(404).json({
        ok: false,
        status: 404,
        mensaje: "Usuario no encontrado",
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

    await Client.update(
      {
        firstName,
        lastName,
        email,
        phone,
        nit,
        address
      },
      {
        where: {
          clientId: clientId,
        },
      }
    );

    return res.status(200).json({
      ok: true,
      status: 200,
      mensaje: "Client Update sucessfull",
    });
  } catch (error) {
    console.error("Error creating Client:", error);

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "Validation error occurred.",
        error: error.errors.map((err) => err.message), // Enviar todos los mensajes de validación
      });
    }

    return res.status(500).json({
      ok: false,
      status: 500,
      message: "An error occurred while modify the client.",
      error: error.message,
    });
  }
});





// Función para generar un clientName único
async function generateUniqueClientName(firstName, lastName) {
  const baseClientName = `${firstName.slice(0, 2).toLowerCase()}${lastName.slice(0, 2).toLowerCase()}-`;
  let uniqueClientName;
  let isUnique = false;

  while (!isUnique) {
    // Generar un número aleatorio de 6 dígitos
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    uniqueClientName = `${baseClientName}${randomNum}`;

    // Verificar si el clientName ya existe
    const existingClient = await Client.findOne({ where: { clientName: uniqueClientName } });
    
    if (!existingClient) {
      isUnique = true; // Si no existe, el nombre es único
    }
  }

  return uniqueClientName;
}

// Función para validar la entrada de usuario
async function validateClientInput({
  firstName,
  lastName,
  email,
  phone,
  nit,
  address,
}) {
  const errors = [];

  // Validación de FirstName
  if (!firstName || typeof firstName !== "string" || firstName?.length < 3) {
    errors.push("El firstName debe tener entre al menos 3 caracteres");
  }
  // Validación de lastName
  if (!lastName || typeof lastName !== "string" || lastName?.length < 3) {
    errors.push("El lastName debe tener entre al menos 3 caracteres");
  }
  // Validación de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    errors.push("El formato del email no es válido.");
  }
  // Validación de telefono
  if (phone && phone.length < 5) {
    errors.push("El Telefono debe tener al menos 5 caracteres.");
  }
  // Validación de nit
  if (nit &&  nit.length < 5) {
    errors.push("La NIT debe tener al menos 5 caracteres.");
  }
  // Validación de direccion
  if (address && address.length < 5) {
    errors.push("La direccion debe tener al menos 5 caracteres.");
  }
  if (errors.length > 0) {
    throw new Error(JSON.stringify(errors));
  }
}

// EndPoint para desabilitar a un usuario según su Id
router.patch("/client/:id", async (req, res) => {
  try {
    const id = req.params.id;
    
    console.log(id);
    if (isNaN(id)) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "Invalid client ID.",
      });
    }
    const clients = await Client.findOne({
      where: { clientId: id },
    });

    // Validar si el usuario no existe
    if (!clients) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "client not found.",
      });
    }
    // Si el usuario ya está desactivado, omitir la actualización
    if (!clients.isActive) {
      return res.status(200).json({
        ok: true,
        status: 200,
        message: "Client is already inactive.",
      });
    }
    // Actualiza el campo isActive a false para deshabilitar el cliente
    clients.isActive = false;
    await clients.save();

    return res.status(201).json({
      ok: true,
      status: 201,
      mensaje: "Client disable sucessfull",
    });
  } catch (error) {
    console.error("Error creating user:", error);

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "Validation error occurred.",
        error: error.errors.map((err) => err.message),
      });
    }

    return res.status(500).json({
      ok: false,
      status: 500,
      message: "An error occurred while creating the user.",
      error: error.message,
    });
  }
});

module.exports = router;
