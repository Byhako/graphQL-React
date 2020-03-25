import gql from 'graphql-tag';

export const GET_CLIENTS = gql`
  query getClients($limit: Int, $offset: Int, $idSeller: String) {
    getClients(limit: $limit, offset: $offset, idSeller: $idSeller) {
      id
      name
      surname
      company
      type
    }
    numberClients(idSeller: $idSeller)
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
  query getOrders($id: String) {
    getOrders(id: $id) {
      order {
        quantity
        id
      }
      date
      total
      state
      id
      client
    }
  }
`;

export const TOP_CLIENTS = gql`
  query topClients {
    topClients {
      total
      client {
        name
        surname
        idSeller
      }
    }
  }
`;

export const TOP_SELLERS = gql`
  query topSellers {
    topSellers {
      total
      seller {
        name
        role
      }
    }
  }
`;

export const GET_USER = gql`
  query getUser {
    getUser {
      name
      id
      role
    }
  }
`;
