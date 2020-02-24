import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema';

const app = express();

app.get('/', (req, res) => {
  res.send('Server run happy.')
});

class Client {
  constructor(id, {name, surname, company, email}) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.company = company;
    this.email = email;
  }
}

const clientDb = {};

// resolver
const root = {
  cliente: () => ({
    "id": 16546351654165,
    "name": "Selene",
    "surname": "Krista",
    "company": "Hearth",
    "email": "selene@mail.com"
  }),
  createClient: ({input}) => {
    const id = require('crypto').randomBytes(10).toString('hex');
    clientDb[id] = input;
    return new Client(id, input)
  }
};

app.use('/graphql', graphqlHTTP({
  // that schema use
  schema,
  // resolver
  rootValue: root,
  graphiql: true
}));

const PORT = 5050;
app.listen(PORT, () => {
  console.log(`Server run in the port ${PORT}`);
});

