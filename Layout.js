import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import HomePage from './HomePage';
import Chat from './Chat';

const Layout = () => (
  <div>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>

      </ul>
    </nav>
    <main>
      
      <Outlet /> {/* This will render the matching child route */}
    </main>
  </div>
);

export default Layout;
