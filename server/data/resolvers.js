import mongoose from 'mongoose';
import { Clients } from './db';

export const resolvers = {
  Query: {
    getClients: (root, {limit}) => {
      return Clients.find({}).limit(limit);
    },
    getClient: (root, {id}) => {
      return new Promise((resolve, rejects) => {
        Clients.findById(id, (error, cliente) => {
          if (error) rejects(error)
          else resolve(cliente)
        })
      })
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
    }
  }
}
