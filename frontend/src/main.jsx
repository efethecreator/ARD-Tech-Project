import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // App bileşenini içeri aktar
import './index.css'; // TailwindCSS ve global stiller

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
