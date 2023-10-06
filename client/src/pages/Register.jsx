import React, { useState } from 'react';
import '../App.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // Create a data object to send in the POST request
    const data = { username, password };

    try {
      const response = await fetch("https://mym-task-ruby.vercel.app//auth/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage('Registration successful!');
        // You can redirect the user to the login page or another page here
      } else {
        const responseData = await response.json();
        setMessage(responseData.message || 'Registration failed.');
      }
    } catch (error) {
      setMessage('Registration failed.');
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-background"></div>
        <div className="register-form">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="register-button">
              Register
            </button>
          </form>
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Register;
