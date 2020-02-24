import express from 'express';
import graphqlHTTP from 'express-graphql';
import { schema } from './data/schema';

const app = express();

app.get('/', (req, res) => {
  res.send('Server run happy.')
});

schema().then((schema)=>{
  app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
  }));
});

const PORT = 5050;
app.listen(PORT, () => {
  console.log(`Server run in the port ${PORT}`);
});

