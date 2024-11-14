import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css'; // Ensure this file is created and imported for custom styles
import Chat from './Chat';
import LoginForm from './LoginPage';

const HomePage = () => {
  const [groups, setGroups] = useState([
    { id: 1, name: 'Maths Discussion' },
    { id: 2, name: 'Science Discussion' },
    { id: 3, name: 'DAA Discussion' }
  ]);
  const [username, setUsername] = useState('Jainam');
  const[userId,setUserId]=useState(1) 
  const navigate = useNavigate();
  const [groupId,setGroupId] = useState(1);
  const[err,setError]=useState('')
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('userInfo');
    if (token) {  
            setIsLoggedIn(true);  
    }
    else {
        // If no token exists, set login status to false
        setIsLoggedIn(false);
    }
}, []);

  // useEffect(()=>{
  //   if (!isLoggedIn){
      
  //   }
  // },[]

  // );

  // Fetch groups when the component mounts
  useEffect(() => {
    const fetchUserGroups = async () => {
      try {
        const response = await fetch(`http://localhost:5000/get_user_groups/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch groups');
        }

        const data = await response.json();
        if (data.groups) {
          setGroups(data.groups);
        } else {
          setError('No groups found');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    // Call the function to fetch user groups when the component is mounted
    if (userId) {
      fetchUserGroups();
    }
    // fetchUserGroups(); Uncomment this when API is available
  }, [userId]);

  // Navigate to the Chat Page for the selected group
  const joinGroup = (groupId) => {
    // navigate(`/chat/${groupId}`);
    setGroupId(groupId)
  };

  return (
    <div className="home-page">
      {!isLoggedIn &&
        <div>
          <LoginForm  />
        </div>
      }
      {isLoggedIn && 
      <div>
      <div className="group-list">
        <input type='text' placeholder='Search or start a new chat' className='searchbar'></input>
        <ul>
          {groups.map((group, index) => (
            <li key={index}>
              <button onClick={() => setGroupId(group.group_id)}>{group.group_name}</button>
            </li>
          ))}
        </ul>
      </div>
      <div className='groupchat'>
        <Chat userId={userId} groupId={groupId} />
      </div>
      </div>
      }
    </div>
  );
};

export default HomePage;
