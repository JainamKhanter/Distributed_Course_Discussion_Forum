import React from 'react';

const FileUpload = ({ onFileUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload({ name: file.name, url: URL.createObjectURL(file) });
    }
  };

  return (
    <input type="file" onChange={handleFileChange} />
  );
};

export default FileUpload;
