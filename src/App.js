import React, { Component } from 'react';
import logo from './logo.svg';
import Trending from './components/Trending';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  render() {
    const { auctions } = this.props;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="trending-list container">
          <Trending auctions={auctions} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auctions: state.auctions
  }
};


export default connect(mapStateToProps)(App);
