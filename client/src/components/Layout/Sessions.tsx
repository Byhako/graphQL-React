import React from 'react';

import { Query } from 'react-apollo';
import { GET_USER } from '../../queries';

const Sessions = Component => props => (
  <Query query={GET_USER}>
    {({ loading, data, refetch }) => {
      if (loading) return <div />;
      return <Component {...props} refetch={refetch} sessions={data} />
    }}
  </Query>
)

export default Sessions;
