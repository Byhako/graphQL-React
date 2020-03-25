import { Clients, Products, Orders, Users } from './db';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config({ path: 'var.env' });
import jwt from 'jsonwebtoken';

const createToken = (userLogin, secret, expiresIn) => {
  const { user } = userLogin;
  return jwt.sign({ user }, secret, { expiresIn });
};

export const resolvers = {
  Query: {
    getClients: (root, {limit, offset}) => {
      return Clients.find({}).limit(limit).skip(offset);
    },
    getClient: (root, {id}) => {
      return new Promise((resolve, rejects) => {
        Clients.findById(id, (error, cliente) => {
          if (error) rejects(error);
          else resolve(cliente);
        })
      })
    },
    numberClients: (root) => {
      return new Promise((resolve, rejects) => {
        Clients.countDocuments({}, (error, count) => {
          if (error) rejects(error);
          else resolve(count);
        })
      })
    },
    getProducts: (root, {limit, offset}) => {
      return Products.find({}).limit(limit).skip(offset);
    },
    getProduct: (root, {id}) => {
      return new Promise((resolve, rejects) => {
        Products.findById(id, (error, product) => {
          if (error) rejects(error);
          else resolve(product);
        })
      })
    },
    numberProducts: (root) => {
      return new Promise((resolve, rejects) => {
        Products.countDocuments({}, (error, count) => {
          if (error) rejects(error);
          else resolve(count);
        })
      })
    },
    getOrders: (root, {id}) => {
      return new Promise((resolve, rejects) => {
        Orders.find({ client: id }, (error, order) => {
          if (error) rejects(error);
          else resolve(order);
        })
      })
    },
    topClients: (root) => {
      return new Promise((resolve, rejects) => {
        Orders.aggregate([
          {
            $match: { state: 'COMPLETED' }
          },
          {
            $group: {
              _id: '$client',
              total: { $sum: '$total' }
            }
          },
          {
            $lookup: {
              from: 'clients',
              localField: '_id',
              foreignField: '_id',
              as: 'client'
            }
          },
          {
            $sort: { total: -1 }
          },
          {
            $limit: 5
          }
        ], (error, result) => {
          if (error) rejects(error);
          else resolve(result);
        })
      })
    },
    getUser: (root, arg, { userCurrent }) => {
      if (!userCurrent) {
        return null;
      }
      const user = Users.findOne({ user: userCurrent.user });
      return user;
    }
  },
  Mutation: {
    createClient: (root, {input}) => {
      // const id = require('crypto').randomBytes(10).toString('hex');
      const newClient = new Clients({
        name: input.name,
        surname: input.surname,
        company: input.company,
        emails: input.emails,
        age: input.age,
        type: input.type,
        orders: input.orders
      });

      newClient.id = newClient._id;

      return new Promise((resolve, rejects) => {
        newClient.save(error => {
          if(error) rejects(error);
          else resolve(newClient);
        })
      });
    },
    updateClient: (root, {input}) => {
      return new Promise((resolve, rejects) => {
        Clients.findOneAndUpdate({ _id: input.id }, input, {new: true}, (error, client) => {
          if(error) rejects(error);
          else resolve(client);
        })
      })
    },
    deleteClient: (root, {id}) => {
      return new Promise((resolve, rejects) => {
        Clients.findOneAndRemove({ _id: id}, error => {
          if (error) rejects(error);
          else resolve('Client removed successful.');
        })
      })
    },
    createProduct: (root, {input}) => {
      const createProduct = new Products({
        name: input.name,
        price: input.price,
        stock: input.stock
      });

      createProduct.id = createProduct._id;

      return new Promise((resolve, rejects) => {
        createProduct.save(error => {
          if(error) rejects(error);
          else resolve(createProduct);
        })
      });
    },
    updateProduct: (root, {input}) => {
      return new Promise((resolve, rejects) => {
        Products.findOneAndUpdate({ _id: input.id }, input, {new: true}, (error, product) => {
          if(error) rejects(error);
          else resolve(product);
        })
      })
    },
    deleteProduct: (root, {id}) => {
      return new Promise((resolve, rejects) => {
        Products.findOneAndDelete({ _id: id}, error => {
          if (error) rejects(error);
          else resolve('Product removed successful.');
        })
      })
    },
    newOrder: (root, {input}) => {
      const newOrder = new Orders({
        order: input.order,
        total: input.total,
        date: new Date(),
        client: input.client,
        state: 'PENDING'
      });
      newOrder.id = newOrder._id;

      return new Promise((resolve, rejects) => {
        newOrder.save(error => {
          if(error) rejects(error);
          else resolve(newOrder);
        });
      });
    },
    updateOrder: (root, {input}) => {
      return new Promise((resolve, rejects) => {
        // update quantity products
        if (input.state === 'COMPLETED') {
          input.order.forEach(order => {
            Products.updateOne({ _id: order.id },
              {
                "$inc": {
                  "stock": -order.quantity
                }
              },
              function (error) {
                if (error) return new Error(error);
              }
            )
          });
        }

        Orders.findOneAndUpdate(
          { _id: input.id },
          input,
          { new: true },
          error => {
            if(error) rejects(error);
            else resolve('Update success');
          }
        )
      });
    },
    createUsers: async (root, { user, password }) => {
      const userExist = await Users.findOne({ user });

      if (userExist) {
        throw new Error(`El usuario ${user} ya Existe.`);
      } else {
        const newUser = await new Users({ user, password }).save();
        return 'Created successful';
      }
    },
    authenticate: async (root, { user, password }) => {
      const userFind = await Users.findOne({ user });
      if (!userFind) {
        throw new Error('Usuario no Existe.');
      } else {
        const passwordCorrect = await bcrypt.compare(password, userFind.password);
        if (!passwordCorrect) {
          throw new Error('Password Incorrecto.');
        }
        return { token: createToken(userFind, process.env.secret, '1hr') };
      }
    }
  }
}
