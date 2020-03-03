import { Clients, Products } from './db';

export const resolvers = {
  Query: {
    getClients: (root, {limit, offset}) => {
      return Clients.find({}).limit(limit).skip(offset);
    },
    getClient: (root, {id}) => {
      return new Promise((resolve, rejects) => {
        Clients.findById(id, (error, cliente) => {
          if (error) rejects(error)
          else resolve(cliente)
        })
      })
    },
    numberClients: (root) => {
      return new Promise((resolve, rejects) => {
        Clients.countDocuments({}, (error, count) => {
          if (error) rejects(error)
          else resolve(count)
        })
      })
    },
    getProducts: (root, {limit, offset}) => {
      return Products.find({}).limit(limit).skip(offset);
    },
    getProduct: (root, {id}) => {
      return new Promise((resolve, rejects) => {
        Products.findById(id, (error, product) => {
          if (error) rejects(error)
          else resolve(product)
        })
      })
    },
    numberProducts: (root) => {
      return new Promise((resolve, rejects) => {
        Products.countDocuments({}, (error, count) => {
          if (error) rejects(error)
          else resolve(count)
        })
      })
    },
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
          if(error) rejects(error)
          else resolve(newClient)
        })
      })
    },
    updateClient: (root, {input}) => {
      return new Promise((resolve, rejects) => {
        Clients.findOneAndUpdate({ _id: input.id }, input, {new: true}, (error, client) => {
          if(error) rejects(error)
          else resolve(client)
        })
      })
    },
    deleteClient: (root, {id}) => {
      return new Promise((resolve, rejects) => {
        Clients.findOneAndRemove({ _id: id}, error => {
          if (error) rejects(error)
          else resolve('Client removed successful.')
        })
      })
    },
    newProduct: (root, {input}) => {
      const newProduct = new Products({
        name: input.name,
        price: input.price,
        stock: input.stock
      });

      newProduct.id = newProduct._id;

      return new Promise((resolve, rejects) => {
        newProduct.save(error => {
          if(error) rejects(error)
          else resolve(newProduct)
        })
      });
    },
    updateProduct: (root, {input}) => {
      return new Promise((resolve, rejects) => {
        Products.findOneAndUpdate({ _id: input.id }, input, {new: true}, (error, product) => {
          if(error) rejects(error)
          else resolve(product)
        })
      })
    },
    deleteProduct: (root, {id}) => {
      return new Promise((resolve, rejects) => {
        Products.findOneAndDelete({ _id: id}, error => {
          if (error) rejects(error)
          else resolve('Product removed successful.')
        })
      })
    }
  }
}
