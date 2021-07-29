import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {HomeWork} from './HomeWork';

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* {
      HomeWork() // ДЗ от 18.06.2021
    } */}
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
