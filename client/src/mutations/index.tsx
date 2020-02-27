import gql from 'graphql-tag';

export const NEW_CLIENT = gql`
  mutation createClient($input: ClientInput) {
    createClient(input: $input) {
      name
      surname
    }
  }
`;
