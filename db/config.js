const mongoose = require('mongoose');

const dbConnection = async () => {

  try {

    await mongoose.connect(process.env.DB_CNN,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      });

    console.log('DB Online');

  } catch (err) {
    console.log(err);
    throw new Error('Error al Inicializar base de datos');
  }

}

module.exports = {
  dbConnection
}