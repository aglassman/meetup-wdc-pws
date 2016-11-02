import React, { Component } from 'react';
import { retrieveAuctions } from './actions/auctions';
import Trending from './components/Trending';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {

  componentDidMount() {
    this.props.retrieveAuctions();
  }

  render() {
    return (
      <div className="App">
        <div className="trending-list container">
          <Trending auctions={this.props.auctions} />
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

const mapDispatchToProps = (dispatch) => {
  return {
    retrieveAuctions: () => {
      dispatch(retrieveAuctions());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
