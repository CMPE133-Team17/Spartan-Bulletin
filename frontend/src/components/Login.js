import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  }

    const handleSubmit = async (event) => {
  event.preventDefault();
  console.log('Submitting form...');
  const validationErrors = Validation(values);
  setErrors(validationErrors);
  console.log('Validation errors:', validationErrors);

  if (Object.values(validationErrors).every((error) => error === '')) {
    try {
      console.log('Making Axios request...');
      const response = await axios.post('http://localhost:4000/login', values);

      console.log('Server response:', response);

      if (response.data === 'Success') {
        console.log('Login successful, navigating to /home...');
        navigate('/home');
      } else {
        alert('No record of this user exists. Try a different username/password');
      }
    } catch (error) {
      console.log('Axios error: ', error);
    }
  } else {
    console.log('Form has validation errors');
  }
};

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Sign in </h2>
        <form action='' onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              placeholder='Enter .sjsu Email'
              name='email'
              onChange={handleInput}
              className='form-control rounded-0'
            />
            {errors.email && <span className='text-danger'>{errors.email}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              placeholder='Enter Password'
              name='password'
              onChange={handleInput}
              className='form-control rounded-0'
            />
            {errors.password && <span className='text-danger'>{errors.password}</span>}
          </div>
          <button type='submit' className='btn btn-warning'>
            Log in!
          </button>
          <p>New to the Bulletin?</p>
          <Link to='/signup' className='btn btn-secondary'>
            Create an Account!
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
