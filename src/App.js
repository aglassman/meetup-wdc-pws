import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router';
import './App.css';

export default class App extends Component {

  render() {
    return (
      <div className="App container">
        <nav >
          <Link to={`/`}>Home</Link>
        </nav>
        {this.props.children}
      </div>
    );
  }
}
