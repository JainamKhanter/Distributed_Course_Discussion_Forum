import React from 'react';

const UserList = ({ users }) => {
  return (
    <div style={styles.userListContainer}>
      <h3 style={{textAlign:"center",color:'white'}}>Users Online</h3>
      <ul style={styles.userList}>
        {users.map((user, index) => (
          <li key={index} style={styles.userItem}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  userListContainer: {
    textAlign:'center',
    width: '200px',
    padding: '20px',
    backgroundColor: '#f0f0f5',
    borderRight: '1px solid #ddd',
    
  },
  userList: {
    color:'white',
    listStyleType: 'none',
    padding: 0,
  },
  userItem: {
    marginBottom: '10px',
    fontWeight: 'bold',
  },
};

export default UserList;
