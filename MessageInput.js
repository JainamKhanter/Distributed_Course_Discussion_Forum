import React, { useState } from 'react';

const MessageInput = ({ onSendMessage }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSendMessage(text);
      setText('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents a new line if in a textarea
      handleSend();
    }
  };


  return (
    <div className="message-input">
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSend}>
      <img 
        src="https://img.icons8.com/?size=100&id=60700&format=png&color=FFFFFF" // Use a transparent SVG
        alt="icon" 
        style={{
          width: '30px',
          height:'30px',
          marginRight: '8px',
        //   filter: 'invert(1)', // Makes the icon white if it’s black
        }} 
      />
      </button>
    </div>
  );
};

export default MessageInput;
