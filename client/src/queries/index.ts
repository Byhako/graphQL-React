import gql from 'graphql-tag';

export const GET_CLIENTS = gql`
  query getClients($limit: Int, $offset: Int) {
    getClients(limit: $limit, offset: $offset) {
      id
      name
      surname
      company
      type
    }
    numberClients
  }
`;

export const GET_CLIENT = gql`
  query getClient($id: ID) {
    getClient(id: $id) {
      name
      surname
      company
      emails { email }
      age
      type
    }
  }
`;

export const GET_PRODUCTS = gql`
  query getProducts($limit: Int, $offset: Int) {
    getProducts(limit: $limit, offset: $offset) {
      id
      name
      price
      stock
    }
    numberProducts
  }
`;

export const GET_PRODUCT = gql`
  query getProduct($id: ID) {
    getProduct(id: $id) {
      name
      price
      stock
    }
  }
`;

export const GET_ORDERS = gql`
  query {
    getOrders(client: "5e56e060b482c30502c70c75") {
      order {
        quantity
        id
      }
      date
      total
      state
      id
    }
  }
`;
