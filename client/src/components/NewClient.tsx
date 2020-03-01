import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/react-hooks';
import { NEW_CLIENT } from '../mutations';

const NewClient = () => {
  interface Email { email: string };
  interface State {
    name: string,
    surname: string,
    company: string,
    emails: Email,
    age: string,
    type: string
  };
  const [state, setState] = useState<State>({
    name: '',
    surname: '',
    company: '',
    emails: [{ email: '' }],
    age: '',
    type: ''
  });
  const numberEmails: number = state.emails.length;

  const [error, setError] = useState<boolean>(false);
  const [messageModal, setMessageModal] = useState<string>('');

  const [createClient] = useMutation(NEW_CLIENT,{
    onCompleted: () => setMessageModal(`Cliente ${state.name} ${state.surname} creado.`),
    onError: (error) => {console.log(error); setMessageModal('Error. Cliente no creado.')}
  });

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  }, [error]);

  const handleChangeEmails = (e: any, idx: number) => {
    const value: string = e.target.value;
    const emails: object[] = state.emails.map((email: object) => email);
    if (emails[idx]) {
      emails[idx] = { email: value };
    } else {
      emails.push({ email: value });
    }
    setState({ ...state, emails });
  };

  const handleCreateClient = (e, createClient) => {
    e.preventDefault();
    let emailsError: boolean = false;

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
      const input: object = { ...state }
      createClient({ variables: { input } })
    } else {
      setError(true);
    }
  };

  const closeModal = () => {
    setMessageModal('');
    setState({
      name: '',
      surname: '',
      company: '',
      emails: [{ email: '' }],
      age: '',
      type: ''
    });
  };

  const handleAddEmail = () => {
    const emails = state.emails.map((item: object) => item);
    emails.push({ email: '' });
    setState({ ...state, emails });
  };

  const handleRemoveEmail = (id: number) => {
    const emails = state.emails.map((item: object) => item);
    emails.splice(id, 1);
    setState({ ...state, emails });
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
          <div className="form-group col-12">
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
        </div>
        
        <div className="form-row d-flex justify-content-center mb-4">
          {state.emails.map((email: Email, idx: number) => (
            <div className="form-group col-12" key={idx}>
              <label htmlFor={`email${idx}`}>
                Email {numberEmails > 1 ? `${idx + 1}` : ''}
              </label>
              <input
                type="email"
                id={`email${idx}`}
                required
                className='form-control'
                placeholder='Email'
                value={email.email}
                onChange={e => handleChangeEmails(e, idx)}
              />
              {numberEmails > 1 && (
                <span
                  style={{
                    fontSize: '24px',
                    position: 'absolute',
                    right: '12px',
                    top: '28px',
                    color: 'red',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleRemoveEmail(idx)}
                >&times;</span>
              )}
            </div>
          ))}
          <button
            type='button'
            className='btn btn-warning float-right'
            onClick={handleAddEmail}
          >Agregar Email</button>
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
              <Link to='/'>
                <button type="button" className="btn btn-primary">Volver a Lista</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewClient;
