import React from 'react';

const Summarize = (props) => {
  interface Product {
    name: string,
    id: string,
    price: number,
    stock: number,
    quantity: number,
    error: boolean
  };

  const { products, deleteProduct, changeQuantity } = props;

  const error = products.filter(item => item.error);

  if (products.length === 0) return null;

  return (
    <div className="container">
      <h2 className="text-center my-5">Productos Seleccionados</h2>
      {error.length > 0 && 
        <div className="alert alert-danger text-center">Las cantidades no pueden ser negativas ni mayores al stock del producto.</div>
      }
      <table className="table">
        <thead className="bg-success text-light">
          <tr className="font-wieght-bold">
            <th>Producto</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Cantidad</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {products.map((item: Product, index: number) => (
            <tr key={index}>
              <th>{item.name}</th>
              <th>$ {item.price}</th>
              <th>{item.stock}</th>
              <th>
                <input
                  type="number"
                  className="form-control"
                  value={item.quantity || ''}
                  onChange={(e) => changeQuantity(e.target.value, index)}
                  style={
                    { borderColor:
                      `${item.error ? 'red' : '#ced4da'}`
                    }
                  }
                />
              </th>
              <th>
                <button
                  onClick={() => deleteProduct(index)}
                  className="btn btn-danger"
                >Eliminar</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Summarize;
