const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

const createUser = async (req = request, res = response) => {

  const { email, password } = req.body;

  try {

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'Un usuario existe con ese correo'
      });
    }

    user = new User(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });

  }

}

const loginUser = (req = request, res = response) => {

  const { email, password } = req.body;

  res.status(200).json({
    ok: true,
    message: 'Usuario inicio sesión',
    email,
    password
  });

}

const revalidateToken = (req = request, res = response) => {

  res.json({
    ok: true,
    message: 'RENEW'
  });

}

module.exports = {
  revalidateToken,
  createUser,
  loginUser
}