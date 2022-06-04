import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom"; //router로 감싸고싶은 최상위 부분은 root(index.js에서 감싸주김)
import {Provider} from 'react-redux';
import store from './store.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter><App /></BrowserRouter>
  </Provider>
);


reportWebVitals();

