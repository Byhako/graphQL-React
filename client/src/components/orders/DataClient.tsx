import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import { GET_CLIENT } from '../../queries';

const DataClient = (props) => {
  interface emails {
    email: string
  };
  const { id } = props;
  const { loading, error, data } = useQuery(GET_CLIENT, {
    fetchPolicy: "network-only",
    variables: { id }
  });

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{`Error Server: ${error.message}`}</p>;

  const { name, surname, company, emails, age, type } = data.getClient;

  return (
    <>
      <h2 className='text-center my-3'>Datos del Cliente</h2>
      <ul className="list-unstyled my-5">
        <li className="border p-2"><strong>Nombre: </strong>{name}</li>
        <li className="border p-2"><strong>Apellido: </strong>{surname}</li>
        <li className="border p-2"><strong>Empresa: </strong>{company}</li>
        <li className="border p-2">
          <strong>Email: </strong><br />
          {emails.map((item: emails, idx: number) => 
            <React.Fragment key={idx}>
              <span>{item.email}</span><br />
            </React.Fragment>
          )}
        </li>
        <li className="border p-2"><strong>Edad: </strong>{age}</li>
        <li className="border p-2"><strong>Tipo: </strong>{type}</li>
      </ul>
    </>
  );
};

export default DataClient;
