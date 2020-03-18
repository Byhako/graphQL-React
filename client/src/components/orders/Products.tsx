import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const Products = (props) => {
  const { id, products } = props;
  interface Product {
    name: string,
    price: number,
    stock: number,
    id: string
  };

  const options = products.map((item: Product) => ({
    value: item.name,
    label: item.name,
    price: item.price,
    stock: item.stock,
    id: item.id
  }));

  return (
    <div className="container">
      <Select
        options={options}
        components={makeAnimated()}
        placeholder={'Seleccionar Productos'}
        isMulti
      />
    </div>
  );
};

export default Products;
