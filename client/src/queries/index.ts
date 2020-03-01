import gql from 'graphql-tag';

export const CLIENTS_QUERY = gql`
  query {
    getClients {
      id
      name
      surname
      company
      type
    }
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