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
  input ClientInput {
    id: ID
    name: String!
    surname: String!
    company: String!
    email: String!
  }
  type Mutation {
    createClient(input: ClientInput): Cliente
  }
`);

export default schema;
