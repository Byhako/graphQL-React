import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect(
  'mongodb://localhost/tiendaUdemy',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
);

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

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number
});
const Products = mongoose.model('products', productSchema);

const ordesrSchema = new mongoose.Schema({
  order: Array,
  total: Number,
  date: Date,
  client: String,
  state: String
});
const Orders = mongoose.model('orders', ordesrSchema);

export { Clients, Products, Orders };
