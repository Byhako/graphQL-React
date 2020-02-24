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

const resolvers = {
  getClient: ({id}) => (
    new Client(id, clientDb[id])
  ),
  createClient: ({input}) => {
    const id = require('crypto').randomBytes(10).toString('hex');
    clientDb[id] = input;
    return new Client(id, input);
  }
};

export default resolvers;
