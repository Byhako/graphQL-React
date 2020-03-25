import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import { useQuery } from '@apollo/react-hooks';
import { TOP_CLIENTS } from '../../queries';

const Clients = () => {
  interface Client {
    name: string,
    surname: string
  }
  interface TopClient {
    total: number,
    client: [Client]
  }

  const { loading, error, data } = useQuery(TOP_CLIENTS, {
    fetchPolicy: "network-only",
  });

  
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{`Error Server: ${error.message}`}</p>;

  const dataGraph = data.topClients.map((item: TopClient, idx: number) => (
    {
      name: item.client[0].name,
      Total: item.total
    }
  ))

  if (!dataGraph.length) {
    return <p className="text-center">No tienes clientes</p>
  }

  return (
    <div className="container d-flex justify-content-center">
      <BarChart
        width={600}
        height={300}
        data={dataGraph}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}
      >
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip/>
        <Legend />
        <Bar dataKey="Total" fill="#8884d8" />
      </BarChart>
    </div>
  )
};

export default Clients;
