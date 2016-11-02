import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import auctions from './reducers/auctions';

const reducers = combineReducers({
  auctions
});

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
