import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { useMutation } from '@apollo/react-hooks';
import { AUTHENTICATE } from '../../mutations';

const Login = (props) => {
  interface User {
    user: string,
    password: string,
  };
  const [state, setState] = useState<User>({
    user: '',
    password: '',
  });
  const [error, setError] = useState<string>('');

  const [authenticate] = useMutation(AUTHENTICATE,{
    onCompleted: async (data) => {
      localStorage.setItem('token', data.authenticate.token);

      await props.refetch();
      setState({ user: '', password: '' });
      props.history.push('/panel');
    },
    onError: (error) => {setError(error.message.split(': ')[1])}
  });

  const handleSumbit = (e): void => {
    e.preventDefault();
    const input = {
      user: state.user,
      password: state.password,
    };
    authenticate({ variables: input })
  };

  const handleInput = (e): void => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    setError('');
  };

  return (
    <div className="container">
      <h1 className="text-center my-5">Iniciar Sesión</h1>
        <div className="row  justify-content-center">
          <form
            onSubmit={handleSumbit}
            className="col-md-8"
          >
            {error && (
              <h5 className='alert alert-danger p-3 w-100 text-center'>
                {error}
              </h5>
            )}
            <div className="form-group">
              <label>Usuario</label>
              <input 
                onChange={handleInput}
                type="text"
                name="user"
                className="form-control" 
                placeholder="Nombre Usuario"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input 
                onChange={handleInput}
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
              />
            </div>

            <button
              disabled={!state.user || !state.password}
              type="submit"
              className="btn btn-success float-right"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
    </div>
  )
};

export default withRouter(Login);
