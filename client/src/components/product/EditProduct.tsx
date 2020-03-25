import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_PRODUCT } from '../../queries';

import { UPDATE_PRODUCT } from '../../mutations';

const EditProduct = (props) => {
  const id: number = props.match.params.id;
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
  const [err, setErr] = useState<string>('');
  const [messageModal, setMessageModal] = useState<string>('');

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    fetchPolicy: "network-only",
    variables: { id }
  });

  useEffect(() => {
    if (data) {
      const info: State = data.getProduct;
      setState({
        name: info.name,
        price: info.price,
        stock: info.stock
      })
    }
  }, [data]);

  useEffect(() => {
    if (err) {
      setTimeout(() => {
        setErr(false);
      }, 2000);
    }
  }, [err]);

  const [updateProduct] = useMutation(UPDATE_PRODUCT,{
    onCompleted: () => setMessageModal(`Producto ${state.name} actualizado.`),
    onError: (error) => {console.error(error); setMessageModal('Error. Producto no actualizado.')}
  });

  const closeModal = (): void => {
    setMessageModal('');
    setState({
      name: '',
      price: '',
      stock: ''
    });
  };

  const handleUpdateProduct = (e, updateProduct): void => {
    e.preventDefault();
    let isError: boolean = false;
    if (state.price < 0) {
      isError = true;
      setErr('El precio no puede ser negativo.')
    }
    if (state.stock < 1) {
      isError = true;
      setErr('El stock debe ser mayor a 0.')
    }
    if (!isError) {
      const input: object = {
        id,
        name: state.name,
        price: +state.price,
        stock: +state.stock
      };
      updateProduct({ variables: { input } })
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{`Error Server: ${error.message}`}</p>;

  return (
    <div
      className="container d-flex align-items-center"
      style={{ flexDirection: 'column' }}
    >
      <h2 className='text-center mt-4 mb-4'>Editar Producto</h2>
      {err && (
        <h5 className='alert alert-danger p-3 w-100 text-center'>{err}</h5>
      )}

      <form
        className='col-8 m-3'
        onSubmit={e => handleUpdateProduct(e, updateProduct)}
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

export default EditProduct;
