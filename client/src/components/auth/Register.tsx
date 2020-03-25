import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/react-hooks';
import { CREATE_USERS } from '../../mutations';

const Register = ({ history }) => {
  interface User {
    user: string,
    password: string,
    repeatPassword: string,
    name: string,
    role: string
  };
  const [user, setUser] = useState<User>({
    user: '',
    password: '',
    repeatPassword: '',
    name: '',
    role: ''
  });
  const [error, setError] = useState<string>('');

  const [createUser] = useMutation(CREATE_USERS,{
    onCompleted: () => {
      window.confirm(`Usuario ${user.user} creado.`);
      history.push('/clients');
    },
    onError: (error) => {setError(error.message.split(': ')[1])}
  });

  const handleChange = (e): void => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setError('');
  };

  const handleCreate = (e): void => {
    e.preventDefault();
    type Input = {
      user: string,
      password: string,
      name: string,
      role: string
    }
    const input: Input = {
      user: user.user,
      password: user.password,
      name: user.name,
      role: user.role
    };
    createUser({ variables: input })
  }

  return (
    <div className="container">
      <h1 className="text-center my-5">Nuevo Usuario</h1>
      {error && (
        <h5 className='alert alert-danger p-3 w-100 text-center'>
          {error}
        </h5>
      )}
      <div className="row  justify-content-center">
        <form className="col-md-8">
          <div className="row">

            <div className="form-group col-md-6">
              <label>Usuario</label>
              <input
                type="text"
                name="user"
                className="form-control"
                placeholder="Nombre Usuario"
                onChange={handleChange}
              />
              <small className="form-text text-muted">
                Sin espacios ni caracteres especiales.
              </small>
            </div>

            <div className="form-group col-md-6">
              <label>Nombre</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Nombre Completo"
                onChange={handleChange}
              />
              <small className="form-text text-muted">
                Nombres y apellidos.
              </small>
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-6">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>

            <div className="form-group col-md-6">
              <label>Repetir Password</label>
              <input 
                type="password"
                name="repeatPassword"
                className="form-control"
                placeholder="Repetir Password"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '30px' }}>
            <label>Rol</label>
            <select
              className='form-control'
              value={user.rol}
              name='role'
              onChange={handleChange}
            >
              <option value="">Elegir</option>
              <option value="ADMINISTRADOR">ADMINISTRADOR</option>
              <option value="VENDEDOR">VENDEDOR</option>
            </select>
          </div>

          <Link to='/login'>
            <button
              type='button'
              className='btn btn-info float-left'
            >Cancelar</button>
          </Link>
          <button
            type="submit"
            className="btn btn-success float-right"
            disabled={
              !user.user ||
              !user.password ||
              !user.name ||
              !user.role ||
              user.password !== user.repeatPassword
            }
            onClick={handleCreate}
          >
            Crear Usuario
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register;
