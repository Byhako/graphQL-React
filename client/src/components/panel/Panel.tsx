import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import { useQuery } from '@apollo/react-hooks';
import { TOP_CLIENTS, TOP_SELLERS } from '../../queries';

const Panel = ({ session }) => {
  interface Client {
    name: string,
    surname: string
  }
  interface TopClient {
    total: number,
    client: [Client]
  }
  interface Seller {
    name: string,
    rol: string
  }
  interface TopSeller {
    total: number,
    seller: [Seller]
  }

  const { loading, error, data } = useQuery(TOP_CLIENTS, {
    fetchPolicy: "network-only",
  });

  const {
      loading: loadSeller,
      error: errorSeller,
      data: dataSeller
  } = useQuery(TOP_SELLERS, {
    fetchPolicy: "network-only",
  });

  
  if (loading || loadSeller) return <p>Cargando...</p>;
  if (error) return <p>{`Error Server: ${error.message}`}</p>;
  if (errorSeller) return <p>{`Error Server: ${errorSeller.message}`}</p>;

  // Graphing top clients
  let topClients = data.topClients;
  if (session.getUser.role !== 'ADMINISTRADOR') {
    topClients = data.topClients.filter(item =>
      item.client[0].idSeller === session.getUser.id
    );
  }
  const dataGraph = topClients.map((item: TopClient, idx: number) => (
    {
      name: item.client[0].name,
      Total: item.total
    }
  ))

  // Graphing top sellers
  const dataGraphSellers = dataSeller.topSellers.map(
    (item: TopSeller, idx: number) => (
      {
        name: item.seller[0].name,
        Total: item.total
      }
    )
  )

  if (!dataGraph.length) {
    return <p className="text-center">No tienes clientes</p>
  }

  return (
    <div
      className="container d-flex align-items-center"
      style={{ flexDirection: 'column' }}
    >
      <h1 className="text-center my-5">Top 5 Clientes que más Compran</h1>
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

      <h1 className="text-center my-5">Top 5 Vendedores</h1>
      <BarChart
        width={600}
        height={300}
        data={dataGraphSellers}
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

export default Panel;
