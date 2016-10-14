import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import auctions from './reducers/auctions';

const reducers = combineReducers({
  auctions
});

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
