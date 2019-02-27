import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

global.config = {};

fetch(`config.json`)
  .then(response => response.json())
  .then(json => {
    global.config = json;    
    ReactDOM.render(<App />, document.getElementById('root'));
  })
  .catch(err => {
    console.log(err);
  });


serviceWorker.register();
