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
