import React from 'react';
import ReactDOM from 'react-dom';
import {worker} from './mocks/dev-server'
import App from './App';

if(process.env.NODE_ENV==='development'){
  worker.start()
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

