import React from 'react';

const Message = ({ message }) => {
  return (
    <div className="message">
      <p><strong>{message.sender}</strong>: {message.text}</p>
      {message.file && (
        <div>
          <a href={message.file.url} download={message.file.name}>
            {message.file.name}
          </a>
        </div>
      )}
    </div>
  );
};

export default Message;
