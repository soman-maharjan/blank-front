import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './redux/CreateStore';
import persistor from './redux/PersistStore'
import { PersistGate } from 'redux-persist/integration/react'
import Pusher from 'pusher-js';

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000/'

require('dotenv').config()


// Pusher.logToConsole = true;

// var pusher = new Pusher('8d6a5d587c3aaffa2ffb', {

//   authEndpoint: 'http://localhost:8000/broadcasting/auth',
//   cluster: 'ap2',
// });

// var channel = pusher.subscribe('private.615d9bf32321000031004075');
// channel.bind("NewProduct", function (data) {
//   console.log(data);
// });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
