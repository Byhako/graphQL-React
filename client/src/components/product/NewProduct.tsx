import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/react-hooks';
import { NEW_PRODUCT } from '../../mutations';

const NewProduct = () => {
  interface State {
    name: string,
    price: number,
    stock: number,
  };
  const [state, setState] = useState<State>({
    name: '',
    price: '',
    stock: ''
  });
  const [error, setError] = useState<string>('');
  const [messageModal, setMessageModal] = useState<string>('');

  const [createProduct] = useMutation(NEW_PRODUCT,{
    onCompleted: () => setMessageModal(`Producto ${state.name} creado.`),
    onError: (error) => {console.error(error); setMessageModal('Error. Producto no creado.')}
  });

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  }, [error]);

  const closeModal = (): void => {
    setMessageModal('');
    setState({
      name: '',
      price: '',
      stock: ''
    });
  };

  const handleCreateProduct = (e, createProduct): void => {
    e.preventDefault();
    let isError: boolean = false;
    if (state.price < 0) {
      isError = true;
      setError('El precio no puede ser negativo.');
    }
    if (state.stock < 1) {
      isError = true;
      setError('El stock debe ser mayor a 0.');
    }
    if (!isError) {
      const input: object = {
        name: state.name,
        price: +state.price,
        stock: +state.stock
      };
      createProduct({ variables: { input } });
    }
  };

  return (
    <div
      className="container d-flex align-items-center"
      style={{ flexDirection: 'column' }}
    >
      <h2 className='text-center mt-4 mb-4'>Nuevo Producto</h2>
      {error && (
        <h5 className='alert alert-danger p-3 w-100 text-center'>{error}</h5>
      )}

      <form
        className='col-8 m-3'
        onSubmit={e => handleCreateProduct(e, createProduct)}
      >
        <div className="form-row">
          <div className="form-group col-12">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id='name'
              required
              className='form-control'
              placeholder='Nombre del Producto'
              value={state.name}
              onChange={e => setState({ ...state, name: e.target.value })}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-12">
            <label htmlFor="price">Precio</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">$</div>
              </div>
              <input
                type="number"
                id='price'
                required
                className='form-control'
                placeholder='Precio del Producto'
                value={state.price}
                onChange={e => setState({ ...state, price: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-12">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              id='stock'
              required
              className='form-control'
              placeholder='Stock del Producto'
              value={state.stock}
              onChange={e => setState({ ...state, stock: e.target.value })}
            />
          </div>
        </div>

        <Link to='/clients'>
          <button
            type='button'
            className='btn btn-info float-left'
          >Cancelar</button>
        </Link>
        <button type='submit' className='btn btn-success float-right'>Guardar Cambios</button>
      </form>

      {/* Modal */}
      <div
        className="modal"
        role="dialog"
        style={{ display: `${messageModal === '' ? 'none' : 'block'}`, opacity: '1',backgroundColor: '#4a4a4945'}}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <p style={{ margin: '5px' }}>{messageModal}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={closeModal}
              >Cerrar</button>
              <Link to='/products'>
                <button type="button" className="btn btn-primary">Ir a Lista de Productos</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default NewProduct;
