class Client {
  constructor(
    id,
    {
      name,
      surname,
      company,
      emails,
      age,
      type,
      orders
    }
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.company = company;
    this.emails = emails;
    this.age = age;
    this.type = type;
    this.orders = orders;
  }
}

const clientDb = {};

export const resolvers = {
  Query: {
    getClient: ({id}) => (
      new Client(id, clientDb[id])
    )
  },
  Mutation: {
    createClient: ({input}) => {
      const id = require('crypto').randomBytes(10).toString('hex');
      clientDb[id] = input;
      return new Client(id, input);
    }
  }
}
