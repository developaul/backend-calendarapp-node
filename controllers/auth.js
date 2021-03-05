const { request, response } = require('express');

const createUser = (req = request, res = response) => {

  const { name, email, password } = req.body;

  res.status(201).json({
    ok: true,
    msg: 'Usuario registrado',
    name,
    email,
    password
  });

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