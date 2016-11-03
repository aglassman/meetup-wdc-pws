import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Auction from './components/Auction';
import Trending from './components/Trending';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { routerMiddleware, syncHistoryWithStore, routerReducer } from 'react-router-redux';

import auctions from './reducers/auctions';
import selectedAuction from './reducers/selectedAuction';

const reducers = combineReducers({
  auctions,
  selectedAuction,
  routing: routerReducer
});

const middleware = applyMiddleware(thunk, routerMiddleware(browserHistory));

const store = createStore(reducers, middleware);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Trending} />
        <Route path="/auction/:auctionId" component={Auction} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
