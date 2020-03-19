import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useMutation } from '@apollo/react-hooks';
import { NEW_ORDER } from '../../mutations';

import Summarize from './Summarize';

const Products = (props) => {
  const { id, products } = props;
  interface Product {
    id: string,
    name: string,
    price: number,
    stock: number,
    quantity: number,
    error: boolean
  };
  interface Products extends Array<Product>{};
  interface Order {
    id: string,
    quantity: number
  };
  const [state, setState] = useState<Products>([]);

  const productsFiltered: Products = products.filter((item: Product) => item.stock > 0);
  let total: number = 0;

  state.forEach((product: Product) => {
    if (product.quantity) {
      total += product.quantity * product.price;
    }
  });

  const [newOrder] = useMutation(NEW_ORDER, {
    // onCompleted: () => refetch(),
    onError: (error) => console.log(error)
  });

  const handleSelect = (products: Products) => {
    if (products) {
      setState(products);
    } else {
      setState([]);
    };
  };

  const deleteProduct = (idx: number) => {
    console.log('index', idx);
    const listProducts = state.map(item => item);
    listProducts.splice(idx, 1);
    setState(listProducts);
  };

  const changeQuantity = (quantity: number, index: number) => {
    const listProducts = state.map(item => item);
    listProducts[index].error = false;
    listProducts[index].quantity = Number(quantity);
    setState(listProducts);
  };

  const handleNewOrder = () => {
    let error: boolean = false;
    const oldState = state.map(item => item);
    state.forEach((item: Product, idx: number) => {
      if (item.quantity > item.stock || item.quantity < 1) {
        oldState[idx].error = true;
        error = true;
      }
    });

    if (!error) {
      const input = {
        client: id,
        total,
        order: state.map((item: Order) => ({
          id: item.id,
          quantity: item.quantity
        }))
      }
  
      newOrder({ variables: { input } });
  
      window.confirm('Tú pedido se ha generado correctamente');
      props.history.push('/clients');
    } else {
      setState(oldState);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center my-5">Seleccionar Productos</h2>
      <Select
        onChange={handleSelect}
        options={productsFiltered}
        getOptionValue={option => option.id}
        getOptionLabel={option => option.name}
        components={makeAnimated()}
        placeholder={'Seleccionar Productos'}
        value={state}
        isMulti
      />
      <Summarize
        products={state}
        deleteProduct={deleteProduct}
        changeQuantity={changeQuantity}
      />
      <p className="font-weight-bold float-right mt-3">
        Total:
        <span className="font-weight-nomal">
          $ {total}
        </span>
      </p>

      {state.length !== 0 && 
        <button
          className="btn btn-info mt-4"
          disabled={total === 0}
          onClick={handleNewOrder}
        >Generar Pedido</button>
      }
    </div>
  );
};

export default withRouter(Products);
