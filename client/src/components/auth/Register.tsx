import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/react-hooks';
import { CREATE_USERS } from '../../mutations';

const Register = ({ history }) => {
  interface User {
    user: string,
    password: string,
    repeatPassword: string
  };
  const [user, setUser] = useState<User>({
    user: '',
    password: '',
    repeatPassword: ''
  });

  const [createUser] = useMutation(CREATE_USERS,{
    onCompleted: () => {
      window.confirm(`Usuario ${user.user} creado.`);
      history.push('/login');
    },
    onError: (error) => {alert(error.message)}
  });

  const handleChange = (e): void => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleCreate = (e): void => {
    e.preventDefault();
    const input = {
      user: user.user,
      password: user.password,
    };
    createUser({ variables: input })
  }

  return (
    <div className="container">
      <h1 className="text-center mb-5">Nuevo Usuario</h1>
      <div className="row  justify-content-center">
        <form className="col-md-8">
          <div className="form-group">
            <label>Usuario</label>
            <input
              type="text"
              name="user"
              className="form-control"
              placeholder="Nombre Usuario"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Repetir Password</label>
            <input 
              type="password"
              name="repeatPassword"
              className="form-control"
              placeholder="Repetir Password"
              onChange={handleChange}
             />
          </div>

          <Link to='/clients'>
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
