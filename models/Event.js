const { Schema, model } = require('mongoose');

const EventSchema = Schema({
  title: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId, // establece que sera una referencia
    ref: 'User',
    required: true,
  }
});

EventSchema.methods.toJSON = function () {
  const { __v, _id, ...event } = this.toObject();
  return { ...event, id: _id };
}

module.exports = model('Event', EventSchema);
