import gql from 'graphql-tag';

export const NEW_CLIENT = gql`
  mutation createClient($input: ClientInput) {
    createClient(input: $input) {
      name
      surname
    }
  }
`;

export const UPDATE_CLIENT = gql`
  mutation updateClient($input: UpdateClientInput) {
    updateClient(input: $input) {
      name
      surname
    }
  }
`;

export const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID) {
    deleteClient(id: $id)
  }
`;

export const NEW_PRODUCT = gql`
  mutation createProduct($input: ProductInput) {
    createProduct(input: $input) {
      name
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($input: ProductInput) {
    updateProduct(input: $input) {
      name
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID) {
    deleteProduct(id: $id)
  }
`;

export const NEW_ORDER = gql`
  mutation newOrder($input: OrderInput) {
    newOrder(input: $input) {
      total
      date
      order {
        quantity
        id
      }
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation updateOrder($input: OrderInput) {
    updateOrder(input: $input)
  }
`;

export const CREATE_USERS = gql`
  mutation createUsers($user: String!, $password: String!) {
    createUsers(user: $user, password: $password)
  }
`;
