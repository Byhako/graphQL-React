import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema';
import resolvers from './resolvers';

const app = express();

app.get('/', (req, res) => {
  res.send('Server run happy.')
});

app.use('/graphql', graphqlHTTP({
  // that schema use
  schema,
  // resolver
  rootValue: resolvers,
  graphiql: true
}));

const PORT = 5050;
app.listen(PORT, () => {
  console.log(`Server run in the port ${PORT}`);
});

