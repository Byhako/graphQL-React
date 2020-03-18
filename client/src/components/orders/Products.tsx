import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import Summarize from './Summarize';

const Products = (props) => {
  const { id, products } = props;
  interface Product {
    id: string,
    name: string,
    price: number,
    stock: number,
    quantity: number
  };
  interface Products extends Array<Product>{};

  const [state, setState] = useState<Products>([]);
  let total: number = 0;

  state.forEach((product: Product) => {
    if (product.quantity) {
      total += product.quantity * product.price;
    }
  });

  const handleSelect = (products: Products) => {
    if (products) {
      setState(products);
    } else {
      setState([]);
    };
  };
  console.log('hola', state);

  const deleteProduct = (idx: number) => {
    console.log('index', idx);
    const listProducts = state.map(item => item);
    listProducts.splice(idx, 1);
    setState(listProducts);
  };

  const changeQuantity = (quantity: number, index: number) => {
    const listProducts = state.map(item => item);
    listProducts[index].quantity = Number(quantity);
    setState(listProducts);
  };

  return (
    <div className="container">
      <h2 className="text-center my-5">Seleccionar Productos</h2>
      <Select
        onChange={handleSelect}
        options={products}
        getOptionValue={option => option.id}
        getOptionLabel={option => option.name}
        components={makeAnimated()}
        placeholder={'Seleccionar Productos'}
        value={state}
        isMulti
      />
      <Summarize
        deleteProduct={deleteProduct}
        products={state}
        changeQuantity={changeQuantity}
      />
      <p className="font-weight-bold float-right mt-3">
        Total:
        <span className="font-weight-nomal">
          $ {total}
        </span>
      </p>
    </div>
  );
};

export default Products;
