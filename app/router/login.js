const express = require("express");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("../model/User.js");
const bcrypt = require("bcrypt");
const { sync } = require("sequelize/lib/model");
const verifyToken = require("../middlewares/autenticacion.js");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Buscar usuario por nombre de usuario en la base de datos
    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({
        ok: false,
        status: 401,
        message: "User not found.",
      });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({
        ok: false,
        status: 401,
        message: "Invalid username or password",
      });
    }

    // Generar Token
    const token = jwt.sign(
      {
        data: {
          username: user.username,
          role: user.roleId,
        },
      },
      "secret",
      { expiresIn: "30d" }
    ); // Expira en 30 días

    return res.json({
      body: {
        username: user.username,
        roleId: user.roleId,
      },
      token,
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrió un error",
      error,
    });
  }
});

router.get("/logout", verifyToken, (req, res) => {
  res.send(`Logout exitoso para usuario ${req.username}`);
});


module.exports = router;
