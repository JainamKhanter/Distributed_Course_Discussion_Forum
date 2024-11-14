import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import UserList from './UserList';
import { useParams } from 'react-router-dom';

const Chat = ({ userId, groupId }) => {
  const [username, setUsername] = useState('Jainam');
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [lastTimestamp, setLastTimestamp] = useState(new Date().toISOString());
  const [firstTime, setFirstTime] = useState(true)

  const API_URL = 'http://localhost:5000/api';

  const fetchAllMessages = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'App.receive_all_messages',
          params: {
            user_id: userId,
            group_id: groupId,
          },
          id: 1,
        }),
      });

      const data = await response.json();
      if (data.result) {
        const newMessages = data.result;
        if (newMessages.length > 0) {
          setMessages((prevMessages) => [...prevMessages, ...newMessages]);
          setLastTimestamp(newMessages[newMessages.length - 1].timestamp);
        }
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };


  // Function to fetch messages from the server
  const fetchMessages = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'App.receive_messages',
          params: {
            user_id: userId,
            group_id: groupId,
            last_timestamp: lastTimestamp,
          },
          id: 1,
        }),
      });

      const data = await response.json();
      if (data.result) {
        const newMessages = data.result;
        if (newMessages.length > 0) {
          console.log(newMessages);
          setMessages((prevMessages) => [...prevMessages, ...newMessages]);
          setLastTimestamp(newMessages[newMessages.length - 1].timestamp);
        }
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Function to join the chat and fetch initial data
  const joinChat = async () => {
    try {
      // Fetch initial messages and users from the server
      fetchAllMessages();
      // Simulate fetching users (replace with actual API if available)
      setJoined(true);
    } catch (error) {
      console.error('Error joining the chat:', error);
    }
  };

  // Send a new message to the server
  const sendMessage = async (text) => {
    if (!text) return;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'App.send_message',
          params: {
            user_id: userId,
            group_id: groupId,
            content: text,
          },
          id: 1,
        }),
      });

      const data = await response.json();
      if (data.result === 'Message sent successfully') {
        fetchMessages(); // Refresh messages after sending
        console.log({messages})
      } else {
        console.error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Fetch messages periodically
  useEffect(() => {
    if (joined) {
      const interval = setInterval(fetchMessages, 10000); // Fetch messages every 5 seconds
      return () => clearInterval(interval); // Clean up interval on unmount
    }
  }, [joined, lastTimestamp]);

  // Join chat on component mount
  useEffect(() => {
    joinChat();
  }, []);

  return (
    <div className="chat-container" style={styles.container}>
      {!joined ? (
        <div className="join-chat">
          <p>Loading...</p>
        </div>
      ) : (
        <div style={styles.chatLayout}>
           {/* Display user list in the sidebar */}
          
            <MessageList messages={messages} />
            <MessageInput onSendMessage={sendMessage} />
          
        </div>
      )}
    </div>
  );
};

// Inline styling for layout
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'white',
    width: '100vw',
  },
  chatLayout: {
    display: 'flex',
    position:'fixed',
    left:'25.5vw',
    width: '100%',
    height: '100vh',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
  },
  
};

export default Chat;
