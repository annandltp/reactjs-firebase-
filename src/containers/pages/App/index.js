import React from 'react';
import logo from '../../../assets/img/logo/logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Dashboard from '../Dashboard';
import Login from '../Login';
import Register from '../Register';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { store } from '../../../config/redux';

const initialState = {
  popup: false,
  isLogin: false
}

const reducer = (state = initialState, action) => {
  if(action.type === 'CHANGE_POPUP'){
    return {
      ...state,
      popup: action.value
    }
  }
  if(action.type === 'CHANGE_ISLOGIN'){
    return {
      ...state,
      isLogin: action.value
    }
  }
  return state;
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/Login">Login</Link>
              </li>
              <li>
                <Link to="/Register">Register</Link>
              </li>
            </ul>
          </nav>

          <Route path="/" exact component={Dashboard}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/register" exact component={Register}></Route>

        </div>
      </Router>
    </Provider>
    
  );
}

export default App;
