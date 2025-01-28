import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userData, setUserData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:8000/account/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Login successful!');
        setUserData(data);
        
        // Store the user data as a JSON string in local storage
        localStorage.setItem('token', JSON.stringify(data));

        // Navigate to the feeds page after a short delay
        setTimeout(() => {
          navigate('/feeds');
        }, 1000);
      } else {
        setErrorMessage(data.message || 'Invalid email or password.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ fontFamily: 'Roboto, sans-serif' }}
    >
      <div className="text-center">
        <img
          src={logo}
          alt="Logo"
          className="img-fluid"
          style={{ maxWidth: '80%', height: 'auto' }}
        />
        <br />
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>
              <b>LOGIN | Welcome back!</b>
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
              Login
            </button>
            <br />
            <br />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && (
              <p style={{ color: 'rgb(0, 126, 36)' }}>{successMessage}</p>
            )}
            <br />
            <p>
              New to Blog it?{' '}
              <Link
                to="/signup"
                style={{
                  color: '#00d5ff',
                  textDecoration: 'none',
                  marginLeft: '3%',
                }}
              >
                Create new Account
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
