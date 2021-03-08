const jwt = require('jsonwebtoken');
const { request, response } = require('express');

const validateJWT = (req = request, res = response, next) => {

  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay token en la petición'
    });
  }

  try {

    // Validarlo
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    req.uid = uid;
    req.name = name;

  } catch (err) {

    return res.status(401).json({
      ok: false,
      msg: 'Token no válido'
    });

  }

  next();

}

module.exports = {
  validateJWT
}