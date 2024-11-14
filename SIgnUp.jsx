import React, { useState, useEffect } from 'react';
import './LoginForm.css'; // Import the CSS file for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import image from "./image1.png";

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('student');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [googleLoaded, setGoogleLoaded] = useState(false);
  
  
  
  
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const signup = async (username, password,email, userType) => {
      try {
        const response = await axios.post('http://localhost:5000/signup', {
          username,
          password,
          email,
          type: userType,
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 200) {
          localStorage.setItem('userInfo', JSON.stringify(response.data));
          navigate('/');  // Redirect to home or another page after signup
        } else {
          setErrorMessage('SignUp failed.');
        }
      } catch (error) {
        setErrorMessage('An error occurred during signup. Please try again.');
        console.error('Error:', error);
      }
    };

    signup(username, password,email, userType);
  };

 

  return (
    <div className="login-container" style={{display:"flex", flexDirection:"row"}}>
      <div className='SignUpImageContainer' >
      <img src={image} alt="image" />
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
        <button type="submit" className="submit-button">SignUp</button>
      </form>
      
      </div>
       {/* Google sign-in button will be rendered here */}
    </div>
  );
};

export default SignUp;
