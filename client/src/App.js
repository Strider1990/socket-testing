import React, { useState } from 'react';
import './styles/main.css';
import { connect } from 'react-redux';
import { loginUser } from './actions/UserActions';

const App = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  return (
  <div className="App">
    <input 
      className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-300" 
      placeholder="Email"
      onChange={ (e) => setEmail(e.target.value) } />    
    <input 
      className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-300" 
      placeholder="Password"
      type="password"
      onChange={ (e) => setPassword(e.target.value) } />
    <button
      type="button" 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-1" 
      onClick={ () => props.onLoginClicked(email, password) }>
        Login
    </button>
  </div>
)}

const mapDispatchToProps = dispatch => {
  return {
    onLoginClicked: (email, password) => {
      dispatch(loginUser({ email, password }))
    }
  }
}

export default connect(null, mapDispatchToProps)(App);
