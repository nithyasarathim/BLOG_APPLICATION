import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:8000/account/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Account created successfully!');
      } else {
        setErrorMessage(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <div className="text-center">
        <img src={logo} alt="Logo" className="img-fluid" style={{ maxWidth: '80%', height: 'auto' }} />
        <br />
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>
              <b>SIGNUP | Welcome Onboard!</b>
            </legend>
            <div className="form-group text-left" style={{ margin: '1rem' }}>
              <b>
                <label>Email address</label>
              </b>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group text-left" style={{ margin: '1rem' }}>
              <b>
                <label>Password</label>
              </b>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <br />
            <button
              type="submit"
              className="btn btn-primary"
              style={{ backgroundColor: '#00d5ff', fontFamily: 'Roboto' }}
            >
              Create Account
            </button>
            <br />
            <br />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <br />
            <p>
              Already have an account?
              <Link to="/login" style={{ color: '#00d5ff', textDecoration: 'none', marginLeft: '3%' }}>
                Try Login
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Signup;
