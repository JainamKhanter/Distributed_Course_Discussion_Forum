import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';


const MessageList = ({ messages }) => {
    const { groupId } = useParams(); 
    const messagesEndRef = useRef(null);

    // Function to scroll to the bottom of the message list
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  
    // Scroll to the bottom whenever messages change
    useEffect(() => {
      console.log({messages})
      scrollToBottom();
    }, [messages]);
  

  return (
    <div className="message-list" style={{overflowY:"scroll",maxHeight:"92vh"}}>
      {messages.map((msg, index) => (
        <div key={index} className="message">
          <strong>{msg.user_id}</strong>: {msg.content}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
