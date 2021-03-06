/*
  Rutas de Usuarios / Auth
  host + /api/auth
*/
const { check } = require('express-validator');
const { Router } = require('express');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { loginUser, createUser, revalidateToken } = require('../controllers/auth');

const router = Router();

router.post(
  '/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
    validateFields
  ],
  loginUser
);

router.post(
  '/new',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
    validateFields
  ],
  createUser
);

router.get(
  '/renew',
  validateJWT,
  revalidateToken
);

module.exports = router;