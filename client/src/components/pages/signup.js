import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const isValid = {
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    num: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
    length: password.length >= 8,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg('');
    setSuccessMsg('');

    if (!isValid.upper || !isValid.lower || !isValid.num || !isValid.special || !isValid.length) {
      setErrMsg('Password does not meet the requirements.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/account/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg('Account created successfully!');
        setTimeout(() =>{
          navigate('/login');
        },800);
      } else {
        setErrMsg(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setErrMsg('An error occurred. Please try again later.');
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
                <label>Name</label>
              </b>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
              <div className="text-center mt-3"
                  style={{ fontSize: '12px', lineHeight: '1.2', display: 'flex', gap: '18px', flexWrap: 'wrap', textAlign: 'center' }}>
                    <p style={{ color: isValid.upper ? 'green' : 'red', margin: 0 }}>Uppercase</p>| 
                    <p style={{ color: isValid.lower ? 'green' : 'red', margin: 0 }}>Lowercase</p> |
                    <p style={{ color: isValid.num ? 'green' : 'red', margin: 0 }}>Number</p> |
                    <p style={{ color: isValid.special ? 'green' : 'red', margin: 0 }}>Special</p> |
                    <p style={{ color: isValid.length ? 'green' : 'red', margin: 0 }}>8+ Characters</p>
              </div>

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
            {errMsg && <p style={{ color: 'red' }}>{errMsg}</p>}
            {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
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
