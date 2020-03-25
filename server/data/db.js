import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
  idSeller: mongoose.Types.ObjectId
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
  client: mongoose.Types.ObjectId,
  state: String
});
const Orders = mongoose.model('orders', ordesrSchema);

const usersSchema = new mongoose.Schema({
  user: String,
  name: String,
  role: String,
  password: String
});

// Hashear passwords
usersSchema.pre('save', function (next) {
  // if password is not hashed
  if(!this.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (error, salt) => {
    if (error) return next(error);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    })
  })
})
const Users = mongoose.model('users', usersSchema);

export { Clients, Products, Orders, Users };
