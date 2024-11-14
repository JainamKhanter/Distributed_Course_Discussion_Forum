import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css'; // Import the CSS file for styling
import axios from 'axios';
import image from "./image1.png";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [googleLoaded, setGoogleLoaded] = useState(false);

  

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const login = async (username, password) => {
      try {
        const response = await axios.post('http://localhost:5000/login', {
          username: username,
          password: password,
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 200) {
          console.log('Login successful.');

          // Store the token in localStorage
          localStorage.setItem('userInfo', JSON.stringify(response.data));
          navigate('/');
        } else {
          setErrorMessage('Login failed.');
        }
      } catch (error) {
        setErrorMessage('An error occurred during login. Please try again.');
        console.error('Error:', error);
      }
    };

    login(username, password);
  };

 
  return (
    <div className="login-container" style={{display:"flex", flexDirection:"row"}}>
      <div className='SignUpImageContainer' >
      <img src={image}  />
      </div>
      <div className='LoginFormHolder'>
        <div className='LoginTitle'>
        <h1>Welcome!</h1>
        </div>
      <form onSubmit={handleSubmit} className="login-form">
      
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit" className="submit-button">Login</button>
      </form>
      </div>
       {/* Google sign-in button will be rendered here */}
    </div>
  );
};

export default LoginForm;
