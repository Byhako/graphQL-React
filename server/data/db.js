import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/tiendaUdemy', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const clientSchema = new mongoose.Schema({
  name: String,
  surname: String,
  company: String,
  emails: Array,
  age: Number,
  type: String,
  orders: Array,
});

const Clients = mongoose.model('clients', clientSchema);

export { Clients };
