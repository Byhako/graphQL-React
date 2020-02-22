import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema';

const app = express();

app.get('/', (req, res) => {
  res.send('Server run happy.')
});


// resolver
const root = { cliente: () => ({
  "id": 16546351654165,
  "name": "Selene",
  "surname": "Krista",
  "company": "Hearth",
  "email": "selene@mail.com"
}) };

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

