/*
  Events Routes
  host + /api/events
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/events');

const router = Router();

// Antes de llegar a cualquier controlador de cualquier petición que este debajo de este middleware pasara por este middleware
router.use(validateJWT);

router.get(
  '/',
  getEvents
);

router.post(
  '/',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatorio').custom(isDate),
    check('end', 'Fecha de finalización es obligatorio').custom(isDate),
    validateFields
  ],
  createEvent
);

router.put(
  '/:id',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatorio').custom(isDate),
    check('end', 'Fecha de finalización es obligatorio').custom(isDate),
    validateFields
  ],
  updateEvent
)

router.delete(
  '/:id',
  deleteEvent
);

module.exports = router;