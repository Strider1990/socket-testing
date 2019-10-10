import React from 'react';
import logo from './logo.svg';
import Socket from './components/Socket';
import './App.css';
import { connect } from 'react-redux';
import { loginUser } from './actions/UserActions';

const App = (props) => (
  <div className="App">
    <header className="App-header">
      <Socket />
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      <button onClick={ props.onLoginClicked }>Login</button>
    </header>
  </div>
)

const mapDispatchToProps = dispatch => {
  return {
    onLoginClicked: () => {
      dispatch(loginUser({ email: '', password: ''}))
    }
  }
}

export default connect(null, mapDispatchToProps)(App);
