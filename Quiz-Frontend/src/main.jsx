import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { YourContextProvider } from './YourContextProvider'; // Adjust the import path

ReactDOM.render(
  <YourContextProvider>
    <App />
  </YourContextProvider>,
  document.getElementById('root')
);
