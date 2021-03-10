const { request, response } = require('express');

const Event = require('../models/Event');

const getEvents = async (req = request, res = response) => {

  try {

    const events = await Event.find()
      .populate('user', 'name');

    res.json({
      ok: true,
      events
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });

  }

}

const createEvent = async (req = request, res = response) => {

  const event = new Event(req.body);

  try {

    event.user = req.uid;

    const eventDB = await event.save();

    res.json({
      ok: true,
      eventDB
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });

  }

}

const updateEvent = async (req = request, res = response) => {

  const eventId = req.params.id;
  const { uid } = req;

  try {

    // Verificar si el evento éxiste
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no éxiste por ese id'
      });
    }

    // Verificar si la misma persona que creo el evento
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de editar este evento'
      })
    }

    // Actualizar evento
    const newEvent = {
      ...req.body,
      user: uid
    }

    // new indica que quiere que retorne el evento actualizado
    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

    res.json({
      ok: true,
      updatedEvent
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });

  }

}

const deleteEvent = async (req = request, res = response) => {

  const eventId = req.params.id;
  const { uid } = req;

  try {

    // Verificar si el evento éxiste
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no éxiste por ese id'
      });
    }

    // Verificar si la misma persona que creo el evento
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de eliminar este evento'
      })
    }

    // Eliminar evento
    await Event.findByIdAndDelete(eventId);

    res.json({
      ok: true,
      msg: 'Evento eliminado'
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });

  }

}

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
}