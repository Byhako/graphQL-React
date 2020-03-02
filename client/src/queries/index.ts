import gql from 'graphql-tag';

export const CLIENTS_QUERY = gql`
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

export const CLIENT_QUERY = gql`
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