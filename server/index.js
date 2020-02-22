import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema';

const app = express();

app.get('/', (req, res) => {
  res.send('Server run happy.')
});


// resolver
const root = { hello: () => 'Hello GraphQL' };

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

