import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';
import firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCCAZm8dChUMWxog3N0b6EjJVqiYvhsCD0",
  authDomain: "my-app-965e9.firebaseapp.com",
  databaseURL: "https://my-app-965e9.firebaseio.com",
  projectId: "my-app-965e9",
  storageBucket: "my-app-965e9.appspot.com",
  messagingSenderId: "540615049061"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
