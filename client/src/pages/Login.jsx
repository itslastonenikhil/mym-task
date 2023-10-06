import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../App.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState(false);


  const navigate = useNavigate();
  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Create a data object to send in the POST request
    const data = { username, password };

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        withCredentials: true,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(data),
      }).then((response)=>{
        if (response.ok) {
        setMessage('Login successful!');
        setRedirect(true);
        console.log("redirect set")
        // console.log(responseData)

        // return response.json()
        
        
      } else {
        // const responseData = response.json();
        // setMessage(responseData.message || 'Login failed.');
      }
      })
      // .then((data) => {
        // Access the user object from the response data
        // const user = data.user;
        // Now you can use the user data as needed
        // console.log(user); // Example: Log the user data to the console
        // navigate('/')
      // })
      .catch((error) => {
        // Handle any errors that occurred during the fetch or JSON parsing
        console.error(error);
      });
      
    } catch (error) {
      setMessage('Login failed.');
    }
  };

  if(redirect === true){
    // console.log("navigating to homepage")
    window.open("http://localhost:3000", "_self");
  }
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-background"></div>
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
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
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <button className="google-login-button" onClick={google}>Login with Google</button>
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
