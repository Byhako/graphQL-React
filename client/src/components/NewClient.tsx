import React, { useState } from 'react';

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

  return (
    <div
      className="container d-flex align-items-center"
      style={{ flexDirection: 'column' }}
    >
      <h2 className='text-center mt-4 mb-4'>Nuevo Cliente</h2>
      <Mutation mutation={NEW_CLIENT}>
        {createClient => (
          <form
            className='col-8 m-3'
            onSubmit={e => {
              e.preventDefault();
              const input = { ...state }
              createClient({ variables: { input } })
                .then(resp => {
                  console.log(resp)
                  if (resp.data) {
                    const { name, surname } = resp.data.createClient
                    alert(`Cliente ${name} ${surname} creado.`);
                  } else {
                    alert('Error. Cliente no creado.');
                  }
                });
            }}
          >
            <div className="form-row">
              <div className="form-group col-6">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  id='name'
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
