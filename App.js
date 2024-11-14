// import React from 'react';
// import Chat from './Chat';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       {/* <h1>Student-Teacher Chat</h1> */}
//       <Chat />
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route   } from 'react-router-dom';
import HomePage from './HomePage';
// import About from './About';
// import Contact from './Contact';
// import NotFound from './NotFound';
import Layout from './Layout';
import './App.css';
import Chat from './Chat';
import LoginForm from './LoginPage';
import SignUp from './SIgnUp';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} /> */}
          {/* Catch-all route for 404 Not Found */}
          {/* <Route path="*" element={<NotFound />} /> */}
          <Route path="/chat/:groupId" element={<Chat />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUp />} />

        </Routes>
    </Router>
  );
}

export default App;
