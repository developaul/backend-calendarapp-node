const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req = request, res = response) => {

  const { email, password } = req.body;

  try {

    // Verificar email
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

    // Generar JWT
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });

  }

}

const loginUser = async (req = request, res = response) => {

  const { email, password } = req.body;

  try {

    // Verificar email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario existe con ese email'
      });
    }

    // Verificar passwords
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrecto'
      });
    }

    // Generar JWT
    const token = await generateJWT(user.id, user.name);

    res.status(200).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });

  }

}

const revalidateToken = async (req = request, res = response) => {

  const { uid, name } = req;

  // Generar JWT
  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    token
  });

}

module.exports = {
  revalidateToken,
  createUser,
  loginUser
}