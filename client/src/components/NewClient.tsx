import React, { useState, useEffect } from 'react';

import { NEW_CLIENT } from '../mutations';
import { Mutation } from 'react-apollo';

const NewClient = () => {
  const [state, setState] = useState({
    name: '',
    surname: '',
    company: '',
    emails: [{ email: '' }],
    age: '',
    type: ''
  });

  const [error, setError] = useState(false);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  }, [error]);

  const handleChangeEmails = (e: any, idx: number) => {
    const value = e.target.value;
    const emails = state.emails.map(email => email);
    if (emails[idx]) {
      emails[idx] = { email: value };
    } else {
      emails.push({ email: value });
    }
    setState({ ...state, emails });
  };

  const handleCreateClient = (e, createClient) => {
    e.preventDefault();
    let emailsError = false;

    state.emails.forEach((item: any) => {
      if (!item.email) emailsError = true;
    })

    if (
      state.name !== '' ||
      state.surname !== '' ||
      state.company !== '' ||
      state.age !== '' ||
      state.type !== '' ||
      !emailsError
    ) {
      const input = { ...state }
      createClient({ variables: { input } })
        .then(resp => {
          if (resp.data) {
            const { name, surname } = resp.data.createClient
            alert(`Cliente ${name} ${surname} creado.`);
          } else {
            alert('Error. Cliente no creado.');
          }
        });
    } else {
      setError(true);
    }
  };

  return (
    <div
      className="container d-flex align-items-center"
      style={{ flexDirection: 'column' }}
    >
      <h2 className='text-center mt-4 mb-4'>Nuevo Cliente</h2>
      {error && (
        <h5 className='alert alert-danger p-3 w-100 text-center'>Faltan campos por llenar!</h5>
      )}
      <Mutation mutation={NEW_CLIENT}>
        {createClient => (
          <form
            className='col-8 m-3'
            onSubmit={e => handleCreateClient(e, createClient)}
          >
            <div className="form-row">
              <div className="form-group col-6">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  id='name'
                  required
                  className='form-control'
                  placeholder='Nombre'
                  value={state.name}
                  onChange={e => setState({ ...state, name: e.target.value })}
                />
              </div>
              <div className="form-group col-6">
                <label htmlFor="surname">Apellido</label>
                <input
                  type="text"
                  id='surname'
                  required
                  className='form-control'
                  placeholder='Apellido'
                  value={state.surname}
                  onChange={e => setState({ ...state, surname: e.target.value })}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-6">
                <label htmlFor="company">Empresa</label>
                <input
                  type="text"
                  id='company'
                  required
                  className='form-control'
                  placeholder='Empresa'
                  value={state.company}
                  onChange={e => setState({ ...state, company: e.target.value })}
                />
              </div>
              <div className="form-group col-6">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id='email'
                  required
                  className='form-control'
                  placeholder='Email'
                  value={state.emails[0].email}
                  onChange={e => handleChangeEmails(e, 0)}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-6">
                <label htmlFor="age">Edad</label>
                <input
                  type="text"
                  id='age'
                  required
                  className='form-control'
                  placeholder='Edad'
                  value={state.age}
                  onChange={e => setState({ ...state, age: +e.target.value })}
                />
              </div>
              <div className="form-group col-6">
                <label htmlFor="type">Tipo de Cliente</label>
                <select
                  className='form-control'
                  value={state.type}
                  onChange={e => setState({ ...state, type: e.target.value })}
                >
                  <option value="">Elegir...</option>
                  <option value="BASIC">BASIC</option>
                  <option value="PREMIUM">PREMIUM</option>
                </select>
              </div>
            </div>
            <button type='submit' className='btn btn-success float-right'>Guardar Cambios</button>
          </form>
        )}
      </Mutation>
    </div>
  );
};

export default NewClient;
