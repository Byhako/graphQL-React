import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Cliente {
    id: ID
    name: String
    surname: String
    company: String
    email: String
  }
  type Query {
    cliente: Cliente
  }
`);

export default schema;
