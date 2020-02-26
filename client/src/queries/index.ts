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
