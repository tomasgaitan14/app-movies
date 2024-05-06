const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const register = async (req, res) => {

  try {

    let userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya está registrado.'});
    }

    const user = new User({ 
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    });
    await user.save();

    res.status(200).json({ message: 'Usuario registrado exitosamente.'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor.'});
  }
};

const login = async (req, res) => {

  try {
    const user = await User.findOne({ email: req.body.email});

    if (!user) {
      return res.status(400).json({ message: 'No se encontro el usuario.'});
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(400).json({ message: 'Contraseña incorrecta.'});
    }

    const token = jwt.sign(
      { userId: user._id }, 
      process.env.SECRET, 
      { expiresIn: '10min' }
    );

    res.status(200).json({ message: 'Usuario loggeado correctamente', token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor.'});
  }
};

module.exports = { register, login };